import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  /* return NextResponse.redirect(new URL('/home', request.url)) */

  const sesion = cookies().get('sesion')
  const rolId = cookies().get('rolId')

  if (rolId && sesion) {
    const { payload } = await jwtVerify(
      sesion.value,
      new Uint8Array(new TextEncoder().encode(process.env.PRIVATE_KEY))
    )
    if (payload) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    /* const userData = verify(sesion.value, 'secret-key') */
  }
  cookies().delete('sesion')
  cookies().delete('rolId')
  return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
  matcher: ['/dashboard/:path*'],
}
