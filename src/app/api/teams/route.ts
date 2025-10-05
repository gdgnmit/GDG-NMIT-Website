import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongodb";

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
      .project({ _id: 1 })
      .toArray();

    const memberIds = members.map(m => m._id);

    return NextResponse.json({
      team: {
        ...team,
        members: memberIds,
      },
      year,
    });
  } else {
    const teams = await db.collection("teams").find({}).toArray();
    
    const teamsWithMemberIds = await Promise.all(
      teams.map(async (team) => {
        const members = await db.collection("members")
          .find({ teamId: new ObjectId(team._id) })
          .project({ _id: 1 })
          .toArray();

        const memberIds = members.map(m => m._id);

        return {
          ...team,
          members: memberIds,
        };
      })
    );

    return NextResponse.json({ teams: teamsWithMemberIds });
  }
}


export async function POST(request: NextRequest) {
  const { client } = await connectToDatabase();
  const db = client.db();
  const teams = db.collection("teams");

  const body = await request.json();

  if (!body.year || !body.name) {
    return NextResponse.json({ error: "Missing required fields: year, name, teamId" }, { status: 400 });
  }

  const existingTeamById = await teams.findOne({ _id: body.teamId });
  if (existingTeamById) {
    return NextResponse.json({ error: "teamId already exists" }, { status: 400 });
  }

  const existingTeamByYear = await teams.findOne({ year: body.year });
  if (existingTeamByYear) {
    return NextResponse.json({ error: "Team for this year already exists" }, { status: 400 });
  }

  const team = {
    _id: body.teamId,  
    year: body.year,
    name: body.name,
  };

  const result = await teams.insertOne(team);

  return NextResponse.json({ message: "Team created", teamId: result.insertedId.toString() });
}
