import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');
    const eventType = searchParams.get('eventType');

    const now = new Date();
    const query: any = {
      eventDate: { $gte: now },
    };

    if (eventType && eventType !== 'All') {
      query.eventType = eventType;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
        { eventType: searchRegex },
      ];
    }

    let eventsQuery = Event.find(query).sort({ eventDate: 1 });

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        eventsQuery = eventsQuery.limit(parsedLimit);
      }
    }

    const events = await eventsQuery.exec();

    return NextResponse.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error: any) {
    console.error('Error fetching upcoming events in Next.js API:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch upcoming events',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

