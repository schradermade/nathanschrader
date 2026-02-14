import { PortfolioShell } from '@/components/PortfolioShell';
import { notFound } from 'next/navigation';
import {
  HVACOPS_DOSSIER_ID,
  HVACOPS_SECTION_IDS,
  isHvacopsSectionId,
} from '@/lib/portfolio-routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return HVACOPS_SECTION_IDS.map((section) => ({
    dossier: HVACOPS_DOSSIER_ID,
    section,
  }));
}

export default function DossierSectionPage({
  params,
}: {
  params: { dossier: string; section: string };
}) {
  if (params.dossier !== HVACOPS_DOSSIER_ID || !isHvacopsSectionId(params.section)) {
    notFound();
  }

  return <PortfolioShell />;
}
