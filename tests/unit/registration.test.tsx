import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { RegistrationFlow } from '@/features/privacy/registration-flow';
describe('recorrido visual de privacidad', () => {
  it('exige una decisión explícita y no confirma persistencia', async () => {
    const user = userEvent.setup(); render(<RegistrationFlow/>);
    expect(screen.getByText(/CONTENIDO DEMOSTRATIVO/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Revisar finalidades/ }));
    expect(screen.getAllByRole('radio').every(input => !(input as HTMLInputElement).checked)).toBe(true);
    await user.click(screen.getByRole('button', { name: /Revisar decisiones/ }));
    expect(screen.getByRole('alert')).toHaveTextContent('Elige aceptar o rechazar');
    await user.click(screen.getByRole('radio', { name: /Rechazar ejemplo/ }));
    await user.click(screen.getByRole('button', { name: /Revisar decisiones/ }));
    expect(screen.getByText(/Rechazada en la vista previa/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar decisiones/ })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /Ver siguiente paso/ }));
    expect(screen.getByText(/No se creó ninguna cuenta ni se guardaron decisiones/)).toBeInTheDocument();
  });
  it('presenta un fallo de servicio sin afirmar el registro', () => { render(<RegistrationFlow error/>); expect(screen.getByRole('alert')).toHaveTextContent(/No se registró ninguna decisión/); });
});
