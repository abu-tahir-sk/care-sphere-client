import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';
import { verifyServerToken } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    await connectDB();
    const events = await Event.find({
      organizerEmail: authUser.email.toLowerCase().trim(),
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to fetch user events', error: error.message }, { status: 500 });
  }
}

