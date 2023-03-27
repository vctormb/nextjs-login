import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    if (req.nextUrl.pathname.startsWith('/login') && token) {
      return NextResponse.redirect(new URL('/me', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        if (req.nextUrl.pathname.startsWith('/login')) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = { matcher: ['/me', '/admin/:path*', '/login'] }
