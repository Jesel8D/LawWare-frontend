import { beforeEach, describe, expect, it, vi } from 'vitest';
const auth = vi.hoisted(() => ({ getSession: vi.fn(), getAccessToken: vi.fn() }));
const write = vi.hoisted(() => vi.fn());
vi.mock('@/lib/auth/auth0', () => ({ auth0: auth }));
vi.mock('@/lib/api/backend', async importOriginal => ({ ...(await importOriginal<typeof import('@/lib/api/backend')>()), setProgress: write }));
import { POST } from '@/app/api/vertical/lessons/[id]/progress/route';
const params = { params: Promise.resolve({ id:'95000000-0000-4000-8000-000000000001' }) };
function request(body:string, origin='http://localhost:3000') { return new Request('http://localhost:3000/api/vertical/lessons/x/progress', { method:'POST', headers:{ origin, 'content-type':'application/json' }, body }); }
describe('BFF de progreso', () => {
  beforeEach(() => { vi.stubEnv('APP_BASE_URL','http://localhost:3000'); auth.getSession.mockResolvedValue({ user:{} }); auth.getAccessToken.mockResolvedValue({ token:'fixture' }); write.mockReset(); });
  it('rechaza origen ajeno antes de usar la sesión', async () => { const result=await POST(request('{"estado":"COMPLETADA"}','https://otro.example'),params); expect(result.status).toBe(403); expect(write).not.toHaveBeenCalled(); });
  it('rechaza identificadores ajenos e input sobredimensionado', async () => { expect((await POST(request('{"estado":"COMPLETADA","id_usuario":"otro"}'),params)).status).toBe(400); expect((await POST(request('x'.repeat(1025)),params)).status).toBe(413); expect(write).not.toHaveBeenCalled(); });
  it('solo devuelve confirmación obtenida del backend', async () => { write.mockResolvedValue({ estado:'COMPLETADA' }); const result=await POST(request('{"estado":"COMPLETADA"}'),params); expect(result.status).toBe(200); expect(await result.json()).toEqual({ estado:'COMPLETADA' }); expect(write).toHaveBeenCalledOnce(); });
});
