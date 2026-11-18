import { NextResponse, type NextRequest } from 'next/server';
import { auth0 } from './lib/auth/auth0';
export async function proxy(request: NextRequest) {
  if ((request.nextUrl.pathname === '/demo' || request.nextUrl.pathname.startsWith('/demo/')) && (process.env.NODE_ENV !== 'development' || process.env.LAWWARE_DEMO !== '1')) return new NextResponse('No disponible', { status: 404 });
  if (request.nextUrl.pathname.startsWith('/auth/') && !auth0) return new NextResponse('Autenticación no configurada', { status: 503 });
  return auth0 ? auth0.middleware(request) : NextResponse.next();
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'] };
