import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EventJoin } from '@/models/EventJoin';
import { verifyServerToken } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    await connectDB();
    const joins = await EventJoin.find({
      userEmail: authUser.email.toLowerCase().trim(),
    })
      .populate('eventId')
      .exec();

    const validJoinedEvents = joins
      .filter((join) => join.eventId !== null)
      .map((join) => {
        const eventData = join.eventId as any;
        return {
          joinId: join._id,
          joinedAt: join.joinedAt,
          event: {
            _id: eventData._id,
            title: eventData.title,
            description: eventData.description,
            eventType: eventData.eventType,
            thumbnail: eventData.thumbnail,
            location: eventData.location,
            eventDate: eventData.eventDate,
            organizerName: eventData.organizerName,
            organizerEmail: eventData.organizerEmail,
            organizerPhoto: eventData.organizerPhoto,
            participantsCount: eventData.participantsCount,
          },
        };
      });

    // Requirement: Show events sorted by event date
    validJoinedEvents.sort((a, b) => {
      const dateA = new Date(a.event.eventDate).getTime();
      const dateB = new Date(b.event.eventDate).getTime();
      return dateA - dateB;
    });

    return NextResponse.json({
      success: true,
      count: validJoinedEvents.length,
      data: validJoinedEvents,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to fetch joined events', error: error.message }, { status: 500 });
  }
}

