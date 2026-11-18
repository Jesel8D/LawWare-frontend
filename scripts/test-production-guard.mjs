import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
const port = 3212;
await new Promise((done, fail) => { const probe = createServer(); probe.once('error', fail); probe.listen(port, '127.0.0.1', () => probe.close(done)); });
const child = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: 'ignore', env: { ...process.env, NODE_ENV: 'production', LAWWARE_DEMO: '1', NEXT_TELEMETRY_DISABLED: '1', AUTH0_DOMAIN: '', AUTH0_CLIENT_ID: '', AUTH0_CLIENT_SECRET: '', AUTH0_SECRET: '', AUTH0_AUDIENCE: '', APP_BASE_URL: '' } });
try {
  let ready = false;
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) { ready = true; break; } } catch {} await delay(500); }
  if (!ready) throw new Error('Servidor de producción local no arrancó');
  const demo = await fetch(`http://127.0.0.1:${port}/demo/multiples/dashboard`);
  const notice = await fetch(`http://127.0.0.1:${port}/demo/registro/aviso`);
  if (demo.status !== 404 || notice.status !== 404) throw new Error(`Modo demo accesible: ${demo.status}, ${notice.status}`);
  console.log('OK: modo demo devuelve 404 en build de producción incluso con LAWWARE_DEMO=1.');
} finally { child.kill(); }
