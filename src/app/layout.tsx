import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'LawWare | Aprende a decidir', description: 'Una plataforma para explorar la ética y la legislación en tecnología.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><a href="#contenido-principal" className="skip-link">Saltar al contenido</a>{children}</body></html>; }
