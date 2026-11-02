import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { generateServerToken } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, photoURL } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required from OAuth provider.' }, { status: 400 });
    }

    await connectDB();
    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      user = await User.create({
        name: name || 'Community Volunteer',
        email: email.toLowerCase().trim(),
        photoURL:
          photoURL ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'volunteer',
      });
    } else if (photoURL && user.photoURL !== photoURL) {
      user.photoURL = photoURL;
      if (name && user.name !== name) user.name = name;
      await user.save();
    }

    const token = generateServerToken(user);

    return NextResponse.json({
      success: true,
      message: 'OAuth sign-in successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Social auth failed', error: error.message }, { status: 500 });
  }
}

