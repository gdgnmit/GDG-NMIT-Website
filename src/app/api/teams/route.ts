import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongodb";

const standardTiers = [
  'faculty advisor', 'lead', 'co-lead', 'student-advisor',
  'mentor', 'core', 'member'
];

const allDomains = [
  'club', 'tech', 'design', 'content and documentation',
  'pr & marketing', 'social media', 'operations'
];

function domainStruct() {
  const obj: any = {};
  for (const tier of standardTiers) {
    obj[tier] = [];
  }
  obj["member"] = { past: [], recruit: [] };
  return obj;
}

function groupMembers(members: any[]) {
  const byDomain: Record<string, any> = {};
  const memberIdsByDomain: Record<string, string[]> = {};

  allDomains.forEach(domain => {
    byDomain[domain] = domainStruct();
    memberIdsByDomain[domain] = [];
  });

  members.forEach(member => {
    const domain = member.domain;
    const tier = member.tier;
    const _id = member._id.toString();

    if (!byDomain[domain]) return;
    memberIdsByDomain[domain].push(_id);

    if (tier === "past") {
      byDomain[domain].member.past.push(member);
    } else if (tier === "recruit") {
      byDomain[domain].member.recruit.push(member);
    } else if (tier === "member") {
      byDomain[domain].member.past.push(member);
    } else if (standardTiers.includes(tier)) {
      byDomain[domain][tier].push(member);
    }
  });

  for (const domain of allDomains) {
    Object.keys(byDomain[domain]).forEach(tier => {
      if (tier === "member") {
        if (byDomain[domain].member.past.length === 0) delete byDomain[domain].member.past;
        if (byDomain[domain].member.recruit.length === 0) delete byDomain[domain].member.recruit;
        if (Object.keys(byDomain[domain].member).length === 0) delete byDomain[domain].member;
      } else {
        if (Array.isArray(byDomain[domain][tier]) && byDomain[domain][tier].length === 0) {
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
  const { client } = await connectToDatabase();
  const db = client.db();

  if (yearStr) {
    const year = parseInt(yearStr, 10);
    const team = await db.collection("teams").findOne({ year: yearStr });
    if (!team) {
      return NextResponse.json({ error: `Team not found for year ${year}` }, { status: 404 });
    }
    const members = await db.collection("members")
      .find({ teamId: new ObjectId(team._id) })
      .toArray();

    const grouped = groupMembers(members);

    return NextResponse.json({
      team: {
        ...team,
        members: grouped.memberIdsByDomain,
      },
      members: grouped.members,
      year
    });
  }

  const teams = await db.collection("teams").find({}).toArray();
  const allTeamsWithMembers = await Promise.all(
    teams.map(async (team) => {
      const members = await db.collection("members")
        .find({ teamId: new ObjectId(team._id) })
        .toArray();
      const grouped = groupMembers(members);

      return {
        team: {
          ...team,
          members: grouped.memberIdsByDomain,
        },
        members: grouped.members,
        year: team.year,
      };
    })
  );

  return NextResponse.json({ teams: allTeamsWithMembers });
}

export async function POST(request: NextRequest) {
  const { client } = await connectToDatabase();
  const db = client.db();
  const teams = db.collection("teams");

  const body = await request.json();

  if (!body.year || !body.name) {
    return NextResponse.json({ error: "Missing required fields: year, name" }, { status: 400 });
  }

  const existingTeamByYear = await teams.findOne({ year: body.year });
  if (existingTeamByYear) {
    return NextResponse.json({ error: "Team for this year already exists" }, { status: 400 });
  }

  const team = {
    year: body.year,
    name: body.name,
  };

  const result = await teams.insertOne(team);
  return NextResponse.json({ message: "Team created", teamId: result.insertedId.toString() });
}
