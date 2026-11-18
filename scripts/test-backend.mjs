import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createServer } from 'node:net';

// Integration is optional: the sibling backend must first be built.
const backend = resolve('../LawWare-backend/dist/server.js');
const children = [];
function start(command, args, env) {
  const child = spawn(command, args, { env: { ...process.env, ...env }, stdio: 'ignore' });
  children.push(child); return child;
}
async function waitFor(url) {
  for (let i = 0; i < 60; i++) { try { const response = await fetch(url); if (response.ok) return; } catch {} await delay(500); }
  throw new Error(`No arrancó el servicio local: ${url}`);
}
try {
  for (const port of [3210, 3211]) await new Promise((resolvePort, rejectPort) => { const probe = createServer(); probe.once('error', rejectPort); probe.listen(port, '127.0.0.1', () => probe.close(resolvePort)); });
  start(process.execPath, [backend], { PORT: '3211', HOST: '127.0.0.1', NODE_ENV: 'development', DOTENV_CONFIG_PATH: resolve('scripts/.env.integration-no-existe'), AUTH0_ISSUER_BASE_URL: '', AUTH0_AUDIENCE: '', AUTH0_CLIENT_ID: '', AUTH_DATABASE_URL: '', APP_DATABASE_URL: '' });
  await waitFor('http://127.0.0.1:3211/health');
  start(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', '3210'], { LAWWARE_BACKEND_URL: 'http://127.0.0.1:3211', LAWWARE_DEMO: '1', NEXT_TELEMETRY_DISABLED: '1', AUTH0_DOMAIN: '', AUTH0_CLIENT_ID: '', AUTH0_CLIENT_SECRET: '', AUTH0_SECRET: '', AUTH0_AUDIENCE: '', APP_BASE_URL: '' });
  await waitFor('http://127.0.0.1:3210/');
  const health = await fetch('http://127.0.0.1:3210/api/health');
  const direct = await fetch('http://127.0.0.1:3211/api/v1/auth/me');
  const identity = await fetch('http://127.0.0.1:3210/api/identity');
  if (health.status !== 200 || (await health.json()).status !== 'ok' || direct.status !== 401 || identity.status !== 503) throw new Error(`Contratos inesperados: health=${health.status} backend-me=${direct.status} frontend-identity=${identity.status}`);
  console.log('OK: frontend → backend /health 200; backend /auth/me sin token 401; identidad frontend sin Auth0 configurado 503.');
} finally {
  for (const child of children) child.kill();
}
