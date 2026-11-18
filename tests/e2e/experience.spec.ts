import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('recorrido de registro explícito sin confirmar persistencia', async ({ page }) => {
  await page.goto('/demo/registro/aviso'); await expect(page.getByText(/CONTENIDO DEMOSTRATIVO/)).toBeVisible();
  await page.getByRole('button', { name: 'Revisar finalidades' }).click();
  await expect(page.getByRole('radio', { name: 'Aceptar ejemplo' })).not.toBeChecked();
  await page.getByRole('button', { name: 'Revisar decisiones' }).click(); await expect(page.getByText('Elige aceptar o rechazar para revisar el ejemplo.')).toBeVisible();
  await page.getByRole('radio', { name: 'Rechazar ejemplo' }).check(); await page.getByRole('button', { name: 'Revisar decisiones' }).click();
  await expect(page.getByRole('button', { name: /Guardar decisiones/ })).toBeDisabled(); await page.getByRole('button', { name: 'Ver siguiente paso' }).click();
  await expect(page.getByText(/No se creó ninguna cuenta/)).toBeVisible();
});
test('escenarios múltiples y acceso directo restringido', async ({ page }) => {
  await page.goto('/demo/multiples/dashboard'); const nav = page.getByRole('navigation', { name: 'Navegación de capacidades' });
  await expect(nav.getByRole('link', { name: 'Mi aprendizaje' })).toBeVisible(); await expect(nav.getByRole('link', { name: 'Gestión de contenido' })).toBeVisible(); await expect(nav.getByRole('link', { name: 'Administración' })).toBeVisible();
  await page.goto('/demo/estudiante/administracion'); await expect(page.getByText('No encontramos esta página.')).toBeVisible();
  await page.goto('/demo/toString/dashboard'); await expect(page.getByText('No encontramos esta página.')).toBeVisible();
  await page.goto('/demo/multiples/cuenta'); await expect(page.getByRole('button', { name: /Consultar historial/ })).toBeDisabled(); await expect(page.getByRole('button', { name: /Solicitar revocación/ })).toBeDisabled();
  await page.goto('/administracion'); await expect(page.getByRole('alert').filter({ hasText: 'No fue posible conectar con el servicio' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Navegación autorizada' }).getByRole('link', { name: 'Administración' })).toHaveCount(0);
});
test('estados de cuenta y errores no conceden permisos', async ({ page }) => {
  for (const id of ['visitante','pendiente','bloqueado','inactivo','anonimizado','error_auth','error_privacidad']) { await page.goto(`/demo/${id}/dashboard`); await expect(page.getByText('MODO DEMOSTRACIÓN')).toBeVisible(); await expect(page.getByRole('navigation', { name: 'Navegación de capacidades' }).getByRole('link', { name: 'Administración' })).toHaveCount(0); }
  await expect(page.getByText(/No se registró ninguna decisión/)).toBeVisible();
});
test('navegación por teclado y diseño móvil sin desbordamiento', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); await page.goto('/');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.goto('/demo/registro/aviso'); expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.goto('/demo/multiples/dashboard'); expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});
test('sin sesión real la identidad está cerrada y el acceso no está configurado', async ({ request }) => {
  expect((await request.get('/api/identity')).status()).toBe(503); expect((await request.get('/auth/login')).status()).toBe(503);
  expect((await request.get('/api/vertical/bootstrap')).status()).toBe(503);
  expect((await request.post('/api/vertical/lessons/95000000-0000-4000-8000-000000000001/progress',{data:{estado:'COMPLETADA'}})).status()).toBe(403);
});
test('privacidad comunica la disponibilidad pendiente sin registrar consentimiento', async ({ page }) => {
  await page.goto('/cuenta/aviso');
  await expect(page.getByText('Servicio de privacidad pendiente')).toBeVisible();
  await expect(page.getByText(/No se ha registrado la presentación/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ver recorrido visual demostrativo' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Guardar/ })).toHaveCount(0);
});
test('comprobaciones automáticas esenciales de accesibilidad', async ({ page }) => {
  for (const path of ['/', '/demo/registro/aviso', '/demo/multiples/dashboard']) {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a']).analyze();
    expect(result.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(', ')}`)).toEqual([]);
  }
});
