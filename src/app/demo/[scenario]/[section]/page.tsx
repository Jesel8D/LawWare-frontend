import { notFound } from 'next/navigation';
import { DemoBanner } from '@/components/feedback/demo-banner';
import { DemoWorkspace } from '@/features/dashboard/demo-workspace';
import { demoEnabled, permittedSections, scenarios } from '@/lib/demo';
export const dynamic = 'force-dynamic';
export default async function DemoPage({ params }: { params: Promise<{ scenario: string; section: string }> }) { const { scenario: id, section } = await params; if (!demoEnabled() || !Object.hasOwn(scenarios, id)) notFound(); const scenario = scenarios[id]; if (!permittedSections(scenario).some(item => item.href === section)) notFound(); return <><DemoBanner/><DemoWorkspace id={id} section={section} scenario={scenario}/></>; }
