import { render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { RealWorkspace } from '@/features/academic/real-workspace';

afterEach(() => vi.unstubAllGlobals());

it('muestra el estado vacío cuando el backend no tiene módulos publicados', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      identity: { estado: 'ACTIVO' },
      authorization: { roles: [], capabilities: ['ACADEMIC_READ'] },
      modules: [],
      progress: [],
    }),
  }));
  render(<RealWorkspace section="aprendizaje"/>);
  expect(await screen.findByText('No hay módulos publicados disponibles.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Administración' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Gestión de contenido' })).not.toBeInTheDocument();
});

it('distingue una sesión ausente de una indisponibilidad del servicio', async () => {
  const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, status: 401 }).mockResolvedValueOnce({ ok: false, status: 503 });
  vi.stubGlobal('fetch', fetchMock);
  const { unmount } = render(<RealWorkspace section="dashboard"/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Tu sesión no está disponible.');
  expect(screen.getByRole('link', { name: 'Ir a acceso' })).toBeInTheDocument();
  unmount();
  render(<RealWorkspace section="dashboard"/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('No fue posible conectar con el servicio.');
});
