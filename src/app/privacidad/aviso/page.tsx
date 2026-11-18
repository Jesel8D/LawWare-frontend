import Link from 'next/link';
import { Footer, SiteHeader } from '@/components/layout/site-header';
import { demoEnabled } from '@/lib/demo';
export const dynamic = 'force-dynamic';
export default function Notice() { return <><SiteHeader/><main id="contenido-principal" className="narrow-page"><span className="eyebrow">PRIVACIDAD</span><h1>Tu información<br/><em>merece claridad.</em></h1><div className="access-card"><h2>Aviso de privacidad</h2><p>El aviso vigente y sus finalidades podrán consultarse cuando el servicio y los permisos estén configurados.</p><p className="help">La visualización de esta página no constituye una presentación registrada ni una decisión de consentimiento.</p><p><Link className="inline-link" href="/cuenta/aviso">Consultar aviso del backend</Link></p>{demoEnabled() && <Link className="inline-link" href="/demo/registro/aviso">Ver ejemplo de la interfaz</Link>}</div></main><Footer/></>; }
