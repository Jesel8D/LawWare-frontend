import { z } from 'zod';

const health = z.object({ status: z.literal('ok') });
const identity = z.object({ id_usuario: z.string().uuid(), estado: z.literal('ACTIVO') });
export type Identity = z.infer<typeof identity>;
export class BackendError extends Error {
  constructor(public readonly status: number, public readonly code: string) { super(code); }
}
function baseUrl() {
  const raw = process.env.LAWWARE_BACKEND_URL;
  if (!raw) throw new BackendError(503, 'BACKEND_NOT_CONFIGURED');
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new BackendError(503, 'INVALID_BACKEND_URL');
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') throw new BackendError(503, 'INVALID_BACKEND_URL');
  return url.origin;
}
async function request(path: string, token?: string, body?: object) {
  let response: Response;
  try { response = await fetch(`${baseUrl()}${path}`, { method: body ? 'POST' : 'GET', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000) }); }
  catch (error) { if (error instanceof BackendError) throw error; throw new BackendError(503, 'BACKEND_UNAVAILABLE'); }
  if (!response.ok) throw new BackendError(response.status, 'BACKEND_REJECTED');
  try { return await response.json(); } catch { throw new BackendError(502, 'INVALID_BACKEND_RESPONSE'); }
}
export async function getHealth() { const parsed = health.safeParse(await request('/health')); if (!parsed.success) throw new BackendError(502, 'INVALID_BACKEND_RESPONSE'); return parsed.data; }
export async function getIdentity(token: string): Promise<Identity> { const parsed = identity.safeParse(await request('/api/v1/auth/me', token)); if (!parsed.success) throw new BackendError(502, 'INVALID_BACKEND_RESPONSE'); return parsed.data; }
const cap = z.object({ roles: z.array(z.string()), capabilities: z.array(z.enum(['ACADEMIC_READ','ACADEMIC_PROGRESS','CONTENT_MANAGE','ADMIN_ACCESS','PRIVACY_NOTICE_READ'])) });
const moduleSchema = z.object({ id_modulo: z.string().uuid(), titulo: z.string(), descripcion: z.string(), nivel: z.string(), orden: z.number() });
const lessonSchema = z.object({ id_leccion_version: z.string().uuid(), id_leccion: z.string().uuid(), titulo: z.string(), orden: z.number().optional(), id_modulo: z.string().uuid().optional(), contenido: z.string().optional() });
const progressSchema = z.object({ id_leccion_version: z.string().uuid(), estado: z.enum(['EN_PROGRESO','COMPLETADA']), fecha_inicio: z.string().nullable(), fecha_completado: z.string().nullable() });
function parse<T>(schema: z.ZodType<T>, value: unknown): T { const parsed = schema.safeParse(value); if (!parsed.success) throw new BackendError(502, 'INVALID_BACKEND_RESPONSE'); return parsed.data; }
export async function getCapabilities(token: string) { return parse(cap, await request('/api/v1/auth/capabilities', token)); }
export async function getModules(token: string) { return parse(z.object({ items: z.array(moduleSchema) }), await request('/api/v1/academic/modules', token)); }
export async function getLessons(token: string, id: string) { return parse(z.object({ items: z.array(lessonSchema) }), await request(`/api/v1/academic/modules/${encodeURIComponent(id)}/lessons`, token)); }
export async function getLesson(token: string, id: string) { return parse(lessonSchema.extend({ contenido: z.string(), id_modulo: z.string().uuid() }), await request(`/api/v1/academic/lessons/${encodeURIComponent(id)}`, token)); }
export async function getProgress(token: string) { return parse(z.object({ items: z.array(progressSchema) }), await request('/api/v1/academic/progress', token)); }
export async function setProgress(token: string, id: string, estado: 'EN_PROGRESO' | 'COMPLETADA') { return parse(progressSchema, await request(`/api/v1/academic/lessons/${encodeURIComponent(id)}/progress`, token, { estado })); }
const noticeSchema = z.object({ id_aviso:z.string().uuid(), tipo_aviso:z.string(), version:z.string(), contenido:z.string(), fecha_vigencia:z.string().nullable(), finalidades:z.array(z.object({ id_finalidad:z.string().uuid(), nombre:z.string(), descripcion:z.string(), es_necesaria_servicio:z.boolean(), requiere_consentimiento:z.boolean(), orden:z.number() })) });
export async function getNotice(token: string, type: 'INTEGRAL'|'SIMPLIFICADO'|'CORTO') { return parse(noticeSchema, await request(`/api/v1/privacy/notices/current?type=${encodeURIComponent(type)}`, token)); }
