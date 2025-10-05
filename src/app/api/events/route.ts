import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

function parseDDMMYYYYToDate(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split('/').map(Number);
  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
    return null;
  }
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDateDDMMYYYY(date: Date): string {
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export async function GET(request: NextRequest) {
  const currentDate = new Date();

  try {
    const { client } = await connectToDatabase();
    const db = client.db();
    const events = db.collection('events');

    const pastEvents = await events
      .find({ date: { $lt: currentDate } })
      .sort({ date: 1 }) 
      .toArray();

    const upcomingEvents = await events
      .find({ date: { $gte: currentDate } })
      .sort({ date: 1 }) 
      .toArray();

    const serialize = (arr: any[]) =>
      arr.map((item) => ({
        ...item,
        _id: item._id.toString(),
        date: formatDateDDMMYYYY(item.date),
      }));

    return NextResponse.json({
      pastEvents: serialize(pastEvents),
      upcomingEvents: serialize(upcomingEvents),
      currentDate: formatDateDDMMYYYY(currentDate),
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

    const eventDate = parseDDMMYYYYToDate(body.date);
    if (!eventDate) {
      return NextResponse.json({ error: 'Invalid date format, expected dd/mm/yyyy' }, { status: 400 });
    }

    const now = new Date();

    const existingEvent = await events.findOne({
      title: body.title,
      date: { $gte: now }, 
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
