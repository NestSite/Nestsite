import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('authToken', '', {
    maxAge: -1,
    path: '/',
    httpOnly: true,
  });
  return response;
}
