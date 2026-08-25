import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /saha ve /saha/* → Frontend Vercel'e proxy et
  if (pathname.startsWith('/saha')) {
    // Frontend Vercel URL'sine rewrite yap
    return NextResponse.rewrite(
      new URL(`${pathname}${request.nextUrl.search}`, 'https://motofull-zeta.vercel.app')
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/saha/:path*'],
};
