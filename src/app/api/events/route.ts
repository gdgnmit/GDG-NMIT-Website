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
      .sort({ date: -1 })
      .toArray();

    const upcomingEvents = await events
      .find({ date: { $gte: currentDate } })
      .sort({ date: 1 })
      .toArray();

    const serialize = (arr: any[]) =>
      arr.map((item) => ({ ...item, _id: item._id.toString() }));

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

export async function POST(request: NextRequest) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db();
    const events = db.collection('events');

    const body = await request.json();

    if (!body.title || !body.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const eventDate = new Date(body.date);
    const now = new Date();

    const existingEvent = await events.findOne({
      title: body.title,
      date: { $gte: now }
    });

    if (existingEvent) {
      return NextResponse.json({ error: 'An upcoming event with this title already exists' }, { status: 400 });
    }

    const event = {
      title: body.title,
      description: body.description || '',
      date: eventDate,
    };

    const result = await events.insertOne(event);

    return NextResponse.json({ message: 'Event created successfully', eventId: result.insertedId.toString() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

