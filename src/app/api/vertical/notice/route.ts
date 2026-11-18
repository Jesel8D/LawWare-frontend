import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getNotice } from '@/lib/api/backend';
import { accessToken, apiError } from '@/lib/api/vertical';
export async function GET(request: Request) { const type=z.enum(['INTEGRAL','SIMPLIFICADO','CORTO']).safeParse(new URL(request.url).searchParams.get('type')); if (!type.success) return NextResponse.json({error:'INVALID_INPUT'},{status:400}); try { return NextResponse.json(await getNotice(await accessToken(), type.data), { headers:{'Cache-Control':'no-store'} }); } catch (error) { return apiError(error); } }
