import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Brand() { return <Link href="/" className="brand"><span aria-hidden="true" className="brand-mark">L<span>.</span></span><span>lawware<span className="brand-dot">.</span></span></Link>; }
export function SiteHeader({ authReady = false, demo = false }: { authReady?: boolean; demo?: boolean }) {
  return <header className="site-header"><div className="container header-inner"><Brand/><nav className="header-nav" aria-label="Navegación principal"><Link href="/#experiencia">La experiencia</Link><Link href="/#metodo">Cómo funciona</Link><Link href="/privacidad/aviso">Privacidad</Link></nav><div className="header-actions"><Link className="access-link" href="/acceso">Acceder</Link><Link className="button button-dark button-small" href={demo ? '/demo/registro/aviso' : authReady ? '/registro' : '/registro'}>Comenzar <ArrowUpRight size={15}/></Link></div></div></header>;
}
export function Footer() { return <footer className="site-footer"><div className="container footer-inner"><Brand/><p>Ética y legislación para quienes construyen tecnología.</p><Link href="/privacidad/aviso">Privacidad</Link><span>Una experiencia educativa en desarrollo.</span></div></footer>; }
