import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';
import { verifyServerToken } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Authentication required to create an event.' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const { title, description, eventType, thumbnail, location, eventDate } = body;

    if (!title || !description || !thumbnail || !location || !eventDate) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { success: false, message: 'Invalid event date format.' },
        { status: 400 }
      );
    }

    if (parsedDate <= new Date()) {
      return NextResponse.json(
        { success: false, message: 'Event date must be scheduled in the future.' },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title: title.trim(),
      description: description.trim(),
      eventType: eventType || 'Donation',
      thumbnail: thumbnail.trim(),
      location: location.trim(),
      eventDate: parsedDate,
      organizerEmail: authUser.email.toLowerCase().trim(),
      organizerName: authUser.name,
      participantsCount: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Event created successfully!',
        data: newEvent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating event in Next.js API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event', error: error.message },
      { status: 500 }
    );
  }
}

