import { NextResponse } from 'next/server';
import { getCapabilities, getIdentity, getModules, getProgress } from '@/lib/api/backend';
import { accessToken, apiError } from '@/lib/api/vertical';
export async function GET() { try { const token = await accessToken(); const identity = await getIdentity(token); const authorization = await getCapabilities(token); const academic = authorization.capabilities.includes('ACADEMIC_READ') ? { modules: (await getModules(token)).items, progress: (await getProgress(token)).items } : { modules: [], progress: [] }; return NextResponse.json({ identity, authorization, ...academic }, { headers: { 'Cache-Control':'no-store' } }); } catch (error) { return apiError(error); } }
