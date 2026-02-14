import { PortfolioShell } from '@/components/PortfolioShell';
import { notFound } from 'next/navigation';
import { HVACOPS_DOSSIER_ID } from '@/lib/portfolio-routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ dossier: HVACOPS_DOSSIER_ID }];
}

export default function DossierPage({ params }: { params: { dossier: string } }) {
  if (params.dossier !== HVACOPS_DOSSIER_ID) {
    notFound();
  }

  return <PortfolioShell />;
}
