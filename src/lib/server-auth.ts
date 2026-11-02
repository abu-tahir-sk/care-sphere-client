import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CareSphere_SuperSecret_JWT_Key_2026_SecureKey';

export interface AuthUserPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function verifyServerToken(req: NextRequest): AuthUserPayload | null {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id || decoded.userId || decoded.sub || '',
      email: (decoded.email || '').toLowerCase().trim(),
      name: decoded.name || 'Volunteer',
      role: decoded.role || 'volunteer',
    };
  } catch (err) {
    return null;
  }
}

export function generateServerToken(user: { _id?: any; id?: any; email: string; name: string; role?: string }): string {
  return jwt.sign(
    {
      id: user._id?.toString() || user.id || '',
      email: user.email.toLowerCase().trim(),
      name: user.name,
      role: user.role || 'volunteer',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

