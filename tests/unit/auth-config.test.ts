import { afterEach, describe, expect, it, vi } from 'vitest';
import { authConfigured } from '@/lib/auth/auth0';
afterEach(() => vi.unstubAllEnvs());
describe('configuración de Auth0', () => {
  it('rechaza configuración incompleta, vacía o con audiencia igual al client ID', () => {
    for (const [key, value] of Object.entries({ AUTH0_DOMAIN: 'tenant.example.invalid', AUTH0_CLIENT_ID: 'cliente-prueba', AUTH0_CLIENT_SECRET: 'no-real', AUTH0_SECRET: 'no-real', APP_BASE_URL: 'http://127.0.0.1:3000', AUTH0_AUDIENCE: 'cliente-prueba' })) vi.stubEnv(key, value);
    expect(authConfigured()).toBe(false);
    vi.stubEnv('AUTH0_AUDIENCE', 'https://api.example.invalid');
    expect(authConfigured()).toBe(true);
    vi.stubEnv('AUTH0_CLIENT_SECRET', '   ');
    expect(authConfigured()).toBe(false);
  });
});
