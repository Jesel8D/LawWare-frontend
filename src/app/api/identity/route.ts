import { NextResponse } from 'next/server';
import { BackendError, getIdentity } from '@/lib/api/backend';
import { accessToken } from '@/lib/api/vertical';
export async function GET() {
  const headers = { 'Cache-Control': 'no-store' };
  try {
    return NextResponse.json(await getIdentity(await accessToken()), { headers });
  } catch (error) {
    const status = error instanceof BackendError && [401, 403, 500, 502, 503].includes(error.status) ? error.status : 503;
    const codes: Record<number, string> = { 401: 'UNAUTHENTICATED', 403: 'FORBIDDEN', 500: 'BACKEND_ERROR', 502: 'INVALID_BACKEND_RESPONSE', 503: 'IDENTITY_UNAVAILABLE' };
    return NextResponse.json({ error: codes[status] }, { status, headers });
  }
}
