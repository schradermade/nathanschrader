import { PortfolioShell } from '@/components/PortfolioShell';
import { notFound } from 'next/navigation';
import { isUiProjectId, UI_PROJECT_IDS } from '@/lib/portfolio-routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return UI_PROJECT_IDS.map((project) => ({ project }));
}

export default function ProjectPage({ params }: { params: { project: string } }) {
  if (!isUiProjectId(params.project)) {
    notFound();
  }

  return <PortfolioShell />;
}
