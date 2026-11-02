import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyServerToken } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Invalid or expired session.' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: authUser.email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Session verification failed', error: error.message }, { status: 500 });
  }
}

