import { NextResponse } from 'next/server';
import { getHealth } from '@/lib/api/backend';
export async function GET() {
  try { return NextResponse.json(await getHealth(), { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return NextResponse.json({ error: 'BACKEND_UNAVAILABLE' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
