import { RealWorkspace } from '@/features/academic/real-workspace';
export default async function LessonPage({ params }: { params: Promise<{id:string}> }) { const { id } = await params; return <RealWorkspace section="aprendizaje" lessonId={id}/>; }
