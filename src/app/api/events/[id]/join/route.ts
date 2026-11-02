import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';
import { EventJoin } from '@/models/EventJoin';
import { verifyServerToken } from '@/lib/server-auth';

interface Context {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, context: Context) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required to join an event.' }, { status: 401 });
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

    const userEmail = authUser.email.toLowerCase().trim();

    // Check if user already joined
    const existingJoin = await EventJoin.findOne({ eventId: id, userEmail });
    if (existingJoin) {
      return NextResponse.json(
        { success: false, message: 'You have already registered as a volunteer for this event.' },
        { status: 400 }
      );
    }

    // Read optional custom photo from body
    let userPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    try {
      const body = await req.json();
      if (body?.userPhoto) userPhoto = body.userPhoto;
    } catch {
      // empty body is acceptable
    }

    await EventJoin.create({
      eventId: event._id,
      userEmail,
      userName: authUser.name,
      userPhoto,
    });

    event.participantsCount = (event.participantsCount || 0) + 1;
    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the event as a volunteer!',
      data: { participantsCount: event.participantsCount },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'You have already joined this event.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to join event', error: error.message }, { status: 500 });
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

    const userEmail = authUser.email.toLowerCase().trim();
    const deletedJoin = await EventJoin.findOneAndDelete({ eventId: id, userEmail });

    if (!deletedJoin) {
      return NextResponse.json({ success: false, message: 'You are not registered for this event.' }, { status: 404 });
    }

    event.participantsCount = Math.max(0, (event.participantsCount || 1) - 1);
    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully left the event registration.',
      data: { participantsCount: event.participantsCount },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to leave event', error: error.message }, { status: 500 });
  }
}

