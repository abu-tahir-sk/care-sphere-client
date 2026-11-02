import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';
import { EventJoin } from '@/models/EventJoin';
import { verifyServerToken } from '@/lib/server-auth';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid event identifier.' }, { status: 400 });
    }

    await connectDB();
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 });
    }

    // Also fetch participants
    const joins = await EventJoin.find({ eventId: id }).sort({ joinedAt: -1 }).limit(20);
    const participants = joins.map((j) => ({
      name: j.userName,
      email: j.userEmail,
      photoURL: j.userPhoto,
      joinedAt: j.joinedAt,
    }));

    return NextResponse.json({
      success: true,
      data: {
        ...event.toObject(),
        participants,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error fetching event', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Context) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid event identifier.' }, { status: 400 });
    }

    await connectDB();
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 });
    }

    if (event.organizerEmail.toLowerCase() !== authUser.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'Permission denied. You can only update events created by you.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, eventType, thumbnail, location, eventDate } = body;

    if (eventDate) {
      const parsedDate = new Date(eventDate);
      if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        return NextResponse.json(
          { success: false, message: 'Event date must be scheduled in the future.' },
          { status: 400 }
        );
      }
      event.eventDate = parsedDate;
    }

    if (title) event.title = title.trim();
    if (description) event.description = description.trim();
    if (eventType) event.eventType = eventType.trim();
    if (thumbnail) event.thumbnail = thumbnail.trim();
    if (location) event.location = location.trim();

    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully!',
      data: event,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to update event', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid event identifier.' }, { status: 400 });
    }

    await connectDB();
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 });
    }

    if (event.organizerEmail.toLowerCase() !== authUser.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'Permission denied. You can only delete events created by you.' },
        { status: 403 }
      );
    }

    await Event.findByIdAndDelete(id);
    await EventJoin.deleteMany({ eventId: id });

    return NextResponse.json({
      success: true,
      message: 'Event and associated registrations deleted successfully.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to delete event', error: error.message }, { status: 500 });
  }
}

