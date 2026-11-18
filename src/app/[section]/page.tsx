import { notFound } from 'next/navigation';
import { RealWorkspace } from '@/features/academic/real-workspace';
export default async function Workspace({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!['dashboard','aprendizaje','contenido','administracion','cuenta'].includes(section)) notFound(); return <RealWorkspace section={section}/>; }
