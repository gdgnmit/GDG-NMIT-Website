import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "../../../lib/mongodb";

const standardTiers = [
  "faculty coordinator",
  "lead",
  "co-lead",
  "student-advisor",
  "mentor",
  "core",
  "member",
  "recruit"
] as const;

const allDomains = [
  "club",
  "tech",
  "design",
  "content and documentation",
  "pr & marketing",
  "social media",
  "operations",
  "finance",
] as const;

interface Member {
  _id: ObjectId | string;
  domain: string;
  tier: string;
  [key: string]: unknown;
}

type DomainStruct = {
  [key: string]: unknown;
  member?: { past?: Member[] };
  recruit?: Member[];
};

// Team data changes rarely: let the CDN/browser reuse it briefly.
const CACHE = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" };

function domainStruct(): DomainStruct {
  const obj: DomainStruct = { 
    member: { past: [] },
    recruit: []
  };
  for (const tier of standardTiers) {
    if (tier !== "member" && tier !== "recruit") {
      obj[tier] = [];
    }
  }
  return obj;
}

function groupMembers(members: Member[]) {
  type ByDomain = Record<string, DomainStruct>;
  const byDomain: ByDomain = {};
  const memberIdsByDomain: Record<string, string[]> = {};

  allDomains.forEach((domain) => {
    byDomain[domain] = domainStruct();
    memberIdsByDomain[domain] = [];
  });

  members.forEach((member) => {
    const { domain, tier, _id } = member;
    if (!byDomain[domain]) return;

    const idStr = typeof _id === "string" ? _id : _id.toString();
    memberIdsByDomain[domain].push(idStr);

    const normalizedTier = tier.trim().toLowerCase() as string;

    // Handle special tiers
    if (normalizedTier === "past") {
      byDomain[domain].member?.past?.push(member);
    } else if (normalizedTier === "recruit") {
      byDomain[domain].recruit?.push(member);
    } else if (normalizedTier === "member") {
      byDomain[domain].member?.past?.push(member);
    } else {
      // Handle standard tiers
      type Tier = (typeof standardTiers)[number];
      if (standardTiers.includes(normalizedTier as Tier)) {
        if (!Array.isArray(byDomain[domain][normalizedTier])) {
          byDomain[domain][normalizedTier] = [];
        }
        (byDomain[domain][normalizedTier] as Member[]).push(member);
      }
    }
  });

  // Clean up empty arrays
  for (const domain of allDomains) {
    Object.keys(byDomain[domain]).forEach((tier) => {
      if (tier === "member") {
        const memberObj = byDomain[domain].member;
        if (memberObj?.past && memberObj.past.length === 0) {
          delete memberObj.past;
        }
        if (memberObj && Object.keys(memberObj).length === 0) {
          delete byDomain[domain].member;
        }
      } else if (tier === "recruit") {
        const arr = byDomain[domain].recruit;
        if (Array.isArray(arr) && arr.length === 0) {
          delete byDomain[domain].recruit;
        }
      } else {
        const arr = byDomain[domain][tier];
        if (Array.isArray(arr) && arr.length === 0) {
          delete byDomain[domain][tier];
        }
      }
    });

    if (Object.keys(byDomain[domain]).length === 0) delete byDomain[domain];
    if (memberIdsByDomain[domain].length === 0) delete memberIdsByDomain[domain];
  }

  return { members: byDomain, memberIdsByDomain };
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const yearStr = url.searchParams.get("year");
  const db = await getDb();

  if (yearStr) {
    const year = parseInt(yearStr, 10);
    const team = await db.collection("teams").findOne({ year: yearStr });
    if (!team) {
      return NextResponse.json({ error: `Team not found for year ${year}` }, { status: 404 });
    }

    const members = await db
      .collection<Member>("members")
      .find({ teamId: new ObjectId(team._id) })
      .toArray();

    const grouped = groupMembers(members);

    return NextResponse.json({
      team: { ...team, members: grouped.memberIdsByDomain },
      members: grouped.members,
      year,
    }, { headers: CACHE });
  }

  const teams = await db.collection("teams").find({}).sort({ year: -1 }).toArray();
  const allMembers = await db
    .collection<Member & { teamId?: ObjectId | string }>("members")
    .find({ teamId: { $in: teams.map((team) => team._id) } })
    .toArray();
  const allTeamsWithMembers = teams.map((team) => {
    const members = allMembers.filter((m) => String(m.teamId) === String(team._id));
    const grouped = groupMembers(members);
    return {
      team: { ...team, members: grouped.memberIdsByDomain },
      members: grouped.members,
      year: team.year,
    };
  });

  return NextResponse.json({ teams: allTeamsWithMembers }, { headers: CACHE });
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  const teams = db.collection("teams");

  const body = (await request.json()) as { year?: string; name?: string };

  if (!body.year || !body.name) {
    return NextResponse.json({ error: "Missing required fields: year, name" }, { status: 400 });
  }

  const existingTeamByYear = await teams.findOne({ year: body.year });
  if (existingTeamByYear) {
    return NextResponse.json({ error: "Team for this year already exists" }, { status: 400 });
  }

  const team = { year: body.year, name: body.name };

  const result = await teams.insertOne(team);
  return NextResponse.json({ message: "Team created", teamId: result.insertedId.toString() });
}