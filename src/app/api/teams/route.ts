import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const yearStr = url.searchParams.get("year");
  const year = yearStr ? parseInt(yearStr, 10) : new Date().getFullYear();

  const { client } = await connectToDatabase();
  const db = client.db();

  const team = await db.collection("teams").findOne({ year });
  if (!team) {
    return NextResponse.json({ error: `Team not found for year ${year}` }, { status: 404 });
  }

  const members = await db.collection("members").find({ teamId: team._id }).toArray();

  return NextResponse.json({ team, members, year });
}
