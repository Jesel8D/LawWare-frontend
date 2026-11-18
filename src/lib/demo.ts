export type Capability = 'learn' | 'content' | 'admin';
export type Scenario = { label: string; status: string; capabilities: Capability[]; message?: string };

// These values only select a local visual fixture. They are never credentials.
export const scenarios: Record<string, Scenario> = {
  visitante: { label: 'Visitante', status: 'Sin sesión', capabilities: [] },
  pendiente: { label: 'Registro pendiente', status: 'PENDIENTE_REGISTRO', capabilities: [] },
  estudiante: { label: 'Estudiante', status: 'ACTIVO', capabilities: ['learn'] },
  contenido: { label: 'Gestión de contenido', status: 'ACTIVO', capabilities: ['content'] },
  administracion: { label: 'Administración', status: 'ACTIVO', capabilities: ['admin'] },
  multiples: { label: 'Múltiples capacidades', status: 'ACTIVO', capabilities: ['learn', 'content', 'admin'] },
  bloqueado: { label: 'Cuenta bloqueada', status: 'BLOQUEADO', capabilities: [] },
  inactivo: { label: 'Cuenta inactiva', status: 'INACTIVO', capabilities: [] },
  anonimizado: { label: 'Cuenta anonimizada', status: 'ANONIMIZADO', capabilities: [] },
  error_auth: { label: 'Error de autenticación', status: 'Sin verificar', capabilities: [], message: 'No se pudo verificar la autenticación. No asumimos que necesites registrarte.' },
  error_privacidad: { label: 'Error de privacidad', status: 'PENDIENTE_REGISTRO', capabilities: [], message: 'El servicio de privacidad no está disponible. No se registró ninguna decisión.' },
};
export function demoEnabled() { return process.env.NODE_ENV === 'development' && process.env.LAWWARE_DEMO === '1'; }
export const sections = [
  { href: 'dashboard', label: 'Resumen', capability: null },
  { href: 'aprendizaje', label: 'Mi aprendizaje', capability: 'learn' },
  { href: 'dilemas', label: 'Dilemas éticos', capability: 'learn' },
  { href: 'evaluaciones', label: 'Evaluaciones', capability: 'learn' },
  { href: 'contenido', label: 'Gestión de contenido', capability: 'content' },
  { href: 'administracion', label: 'Administración', capability: 'admin' },
  { href: 'cuenta', label: 'Cuenta y privacidad', capability: null },
] as const;
export function permittedSections(s: Scenario) { return sections.filter(item => !item.capability || s.capabilities.includes(item.capability)); }
