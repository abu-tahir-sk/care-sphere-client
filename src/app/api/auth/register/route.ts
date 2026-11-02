import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { generateServerToken } from '@/lib/server-auth';

function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter.' };
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, photoURL, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email, and password are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      return NextResponse.json({ success: false, message: passCheck.message }, { status: 400 });
    }

    await connectDB();
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'An account with this email already exists.' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      photoURL:
        photoURL && photoURL.trim()
          ? photoURL.trim()
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'volunteer',
    });

    const token = generateServerToken(user);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Welcome to CareSphere.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Registration failed', error: error.message }, { status: 500 });
  }
}

