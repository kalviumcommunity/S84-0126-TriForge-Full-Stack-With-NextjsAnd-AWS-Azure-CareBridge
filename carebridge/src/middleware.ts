import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only run middleware on dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // In a real app, you'd verify the JWT token here
    // For now, we'll let the client-side handle the redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}