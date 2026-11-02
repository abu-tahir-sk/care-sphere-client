import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { EventJoin } from '@/models/EventJoin';
import { verifyServerToken } from '@/lib/server-auth';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: Context) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: true, isJoined: false });
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid event identifier.' }, { status: 400 });
    }

    await connectDB();
    const existingJoin = await EventJoin.findOne({
      eventId: id,
      userEmail: authUser.email.toLowerCase().trim(),
    });

    return NextResponse.json({
      success: true,
      isJoined: !!existingJoin,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, isJoined: false }, { status: 500 });
  }
}

