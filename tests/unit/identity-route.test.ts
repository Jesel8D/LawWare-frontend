import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AccessTokenError, AccessTokenErrorCode } from '@auth0/nextjs-auth0/errors';

const auth = vi.hoisted(() => ({ getSession: vi.fn(), getAccessToken: vi.fn() }));
vi.mock('@/lib/auth/auth0', () => ({ auth0: auth }));
import { GET } from '@/app/api/identity/route';

const originalUrl = process.env.LAWWARE_BACKEND_URL;
beforeEach(() => {
  process.env.LAWWARE_BACKEND_URL = 'http://127.0.0.1:3001';
  auth.getSession.mockResolvedValue({ user: { sub: 'simulado' } });
  auth.getAccessToken.mockResolvedValue({ token: 'token-sintetico' });
});
afterEach(() => { process.env.LAWWARE_BACKEND_URL = originalUrl; vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe('adaptador de identidad de servidor', () => {
  it('requiere sesión y no obtiene un token cuando falta', async () => {
    auth.getSession.mockResolvedValueOnce(null);
    const response = await GET();
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'UNAUTHENTICATED' });
    expect(auth.getAccessToken).not.toHaveBeenCalled();
  });
  it('mantiene los estados del backend sin exponer detalles', async () => {
    for (const [status, code] of [[401, 'UNAUTHENTICATED'], [403, 'FORBIDDEN'], [500, 'BACKEND_ERROR'], [503, 'IDENTITY_UNAVAILABLE']] as const) {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"error":"interno"}', { status })));
      const response = await GET();
      expect(response.status).toBe(status);
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(await response.json()).toEqual({ error: code });
    }
  });
  it('devuelve únicamente la identidad interna validada', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ id_usuario: '1b69ca3f-6847-49ca-9e68-9999cf6bff5e', estado: 'ACTIVO', token: 'no-devolver' })));
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id_usuario: '1b69ca3f-6847-49ca-9e68-9999cf6bff5e', estado: 'ACTIVO' });
  });
  it('no confunde errores de sesión o servicio con un registro pendiente', async () => {
    auth.getAccessToken.mockRejectedValueOnce(new Error('detalle-interno'));
    const response = await GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'IDENTITY_UNAVAILABLE' });
  });
  it('pide autenticación cuando la sesión ha vencido', async () => {
    auth.getAccessToken.mockRejectedValueOnce(new AccessTokenError(AccessTokenErrorCode.SESSION_EXPIRED, 'fixture'));
    const response=await GET(); expect(response.status).toBe(401); expect(await response.json()).toEqual({error:'UNAUTHENTICATED'});
  });
});
