import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { DemoBanner } from '@/components/feedback/demo-banner';
import { RegistrationFlow } from '@/features/privacy/registration-flow';
import { demoEnabled } from '@/lib/demo';
export const dynamic = 'force-dynamic';
export default async function DemoRegistration({ params }: { params: Promise<{ step: string }> }) { const { step } = await params; if (!demoEnabled() || !['aviso', 'finalidades', 'revision', 'vinculacion'].includes(step)) notFound(); return <><DemoBanner/><SiteHeader/><RegistrationFlow initial={step as 'aviso' | 'finalidades' | 'revision' | 'vinculacion'}/></>; }
