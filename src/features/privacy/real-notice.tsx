import Link from 'next/link';
import { demoEnabled } from '@/lib/demo';

export function RealNotice() {
  return <main id="contenido-principal" className="narrow-page">
    <span className="eyebrow">PRIVACIDAD</span>
    <h1>Consulta del aviso</h1>
    <div className="notice-banner"><strong>Servicio de privacidad pendiente</strong></div>
    <p>La consulta del aviso vigente y el registro persistente de privacidad todavía no están disponibles.</p>
    <p>No se ha registrado la presentación de un aviso ni se ha guardado consentimiento.</p>
    {demoEnabled() && <p><Link className="inline-link" href="/demo/registro/aviso">Ver recorrido visual demostrativo</Link></p>}
    <p><Link className="inline-link" href="/cuenta">Volver a cuenta</Link></p>
  </main>;
}
