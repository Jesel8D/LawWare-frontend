import { NextResponse } from 'next/server';
import { getLessons } from '@/lib/api/backend';
import { accessToken, apiError } from '@/lib/api/vertical';
export async function GET(_request: Request, { params }: { params: Promise<{id:string}> }) { try { const { id } = await params; return NextResponse.json(await getLessons(await accessToken(), id), { headers: { 'Cache-Control':'no-store' } }); } catch (error) { return apiError(error); } }
