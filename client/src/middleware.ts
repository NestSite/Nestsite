import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.SECRET_KEY as string;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  console.log(`Middleware check for: ${pathname}`);

  if (pathname.startsWith('/_next/') || pathname.startsWith('/public/')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/login') || pathname.startsWith('/sign-up') || pathname.startsWith('/recover-password') || pathname.startsWith('/reset-password')) {
    const tokenCookie = req.cookies.get('nestsiteAuthToken');
    const token = tokenCookie ? tokenCookie.value : null;

    if (token) {
      try {
        await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        return NextResponse.redirect(new URL('/', req.url));
      } catch (err) {
        console.log('Invalid token, allowing access to login');
        return NextResponse.next();
      }
    }
    
    return NextResponse.next();
  }

  const tokenCookie = req.cookies.get('nestsiteAuthToken');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return NextResponse.next();
  } catch (err) {
    console.log('Invalid token, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
