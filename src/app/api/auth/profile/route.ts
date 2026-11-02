import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyServerToken } from '@/lib/server-auth';

export async function PUT(req: NextRequest) {
  try {
    const authUser = verifyServerToken(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    const body = await req.json();
    const { name, photoURL, bio } = body;

    await connectDB();
    const user = await User.findOne({ email: authUser.email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    if (name && name.trim()) user.name = name.trim();
    if (photoURL && photoURL.trim()) user.photoURL = photoURL.trim();
    if (bio !== undefined) user.bio = bio.trim();

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully!',
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
    return NextResponse.json({ success: false, message: 'Failed to update profile', error: error.message }, { status: 500 });
  }
}

