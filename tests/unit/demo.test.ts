import { describe, expect, it } from 'vitest';
import { permittedSections, scenarios } from '@/lib/demo';
describe('capacidades visuales sintéticas', () => {
  it('muestra la unión de capacidades sin asumir un rol principal', () => { const names = permittedSections(scenarios.multiples).map(s => s.href); expect(names).toEqual(expect.arrayContaining(['aprendizaje','contenido','administracion'])); });
  it('no muestra capacidades sensibles a estudiante o bloqueado', () => { expect(permittedSections(scenarios.estudiante).map(s => s.href)).not.toContain('administracion'); expect(permittedSections(scenarios.bloqueado).map(s => s.href)).not.toContain('aprendizaje'); });
});
