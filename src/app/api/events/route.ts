import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  const currentDate = new Date();

  try {
    const { client } = await connectToDatabase();
    const db = client.db(); 
    const events = db.collection('events');

    const pastEvents = await events
      .find({ date: { $lt: currentDate } })
      .sort({ date: -1 }).toArray();

    const upcomingEvents = await events
      .find({ date: { $gte: currentDate } })
      .sort({ date: 1 }).toArray();

    const serialize = (arr: any[]) =>
      arr.map(item => ({ ...item, _id: item._id.toString() }));

    return NextResponse.json({
      pastEvents: serialize(pastEvents),
      upcomingEvents: serialize(upcomingEvents),
      currentDate: currentDate.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
