import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth/auth0';
import { BackendError } from '@/lib/api/backend';
import { AccessTokenError, AccessTokenErrorCode } from '@auth0/nextjs-auth0/errors';

export async function accessToken(): Promise<string> {
  if (!auth0) throw new BackendError(503, 'AUTH_NOT_CONFIGURED');
  if (!await auth0.getSession()) throw new BackendError(401, 'UNAUTHENTICATED');
  try { return (await auth0.getAccessToken()).token; }
  catch (error) {
    if (error instanceof AccessTokenError && [AccessTokenErrorCode.MISSING_SESSION, AccessTokenErrorCode.SESSION_EXPIRED, AccessTokenErrorCode.MISSING_REFRESH_TOKEN].includes(error.code as AccessTokenErrorCode)) throw new BackendError(401, 'UNAUTHENTICATED');
    throw error;
  }
}
export function apiError(error: unknown) {
  const status = error instanceof BackendError && [400,401,403,404,500,502,503].includes(error.status) ? error.status : 503;
  const codes: Record<number,string> = { 400:'INVALID_INPUT',401:'UNAUTHENTICATED',403:'FORBIDDEN',404:'NOT_FOUND',500:'BACKEND_ERROR',502:'INVALID_BACKEND_RESPONSE',503:'SERVICE_UNAVAILABLE' };
  return NextResponse.json({ error: codes[status] }, { status, headers: { 'Cache-Control':'no-store' } });
}
export function validOrigin(request: Request) {
  try { const allowed = new URL(process.env.APP_BASE_URL ?? ''); return request.headers.get('origin') === allowed.origin && request.headers.get('sec-fetch-site') !== 'cross-site'; }
  catch { return false; }
}
