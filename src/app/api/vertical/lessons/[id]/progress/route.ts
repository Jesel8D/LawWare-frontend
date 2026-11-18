import { NextResponse } from 'next/server';
import { z } from 'zod';
import { setProgress } from '@/lib/api/backend';
import { accessToken, apiError, validOrigin } from '@/lib/api/vertical';
export async function POST(request: Request, { params }: { params: Promise<{id:string}> }) {
  if (!validOrigin(request)) return NextResponse.json({ error:'FORBIDDEN' }, { status:403, headers:{ 'Cache-Control':'no-store' } });
  if (request.headers.get('content-type')?.split(';',1)[0].trim().toLowerCase() !== 'application/json') return NextResponse.json({ error:'INVALID_INPUT' }, { status:415 });
  const reader = request.body?.getReader(); if (!reader) return NextResponse.json({ error:'INVALID_INPUT' }, { status:400 });
  const chunks: Uint8Array[] = []; let length = 0;
  try { for (;;) { const { done, value } = await reader.read(); if (done) break; length += value.byteLength; if (length > 1024) { await reader.cancel(); return NextResponse.json({ error:'PAYLOAD_TOO_LARGE' }, { status:413 }); } chunks.push(value); } } catch { return NextResponse.json({ error:'INVALID_INPUT' }, { status:400 }); }
  let input: unknown; try { const bytes = new Uint8Array(length); let offset=0; for (const chunk of chunks) { bytes.set(chunk,offset); offset+=chunk.byteLength; } input=JSON.parse(new TextDecoder().decode(bytes)); } catch { return NextResponse.json({ error:'INVALID_INPUT' }, { status:400 }); }
  const data = z.object({ estado:z.enum(['EN_PROGRESO','COMPLETADA']) }).strict().safeParse(input);
  if (!data.success) return NextResponse.json({ error:'INVALID_INPUT' }, { status:400 });
  try { const { id } = await params; return NextResponse.json(await setProgress(await accessToken(),id,data.data.estado), { headers:{ 'Cache-Control':'no-store' } }); } catch (error) { return apiError(error); }
}
