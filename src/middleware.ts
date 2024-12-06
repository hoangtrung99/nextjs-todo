import { type NextRequest, NextResponse } from 'next/server'

export default async function authMiddleware(request: NextRequest) {
  console.log('authMiddleware', request.nextUrl.origin)
  const response = await fetch('http://127.0.0.1:3000/api/auth/get-session', {
    headers: {
      //get the cookie from the request
      cookie: request.headers.get('cookie') || ''
    }
  })
  const session = await response.json()

  console.log('session', session)

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign*).*)'
  ]
}
