export const UI_PROJECT_IDS = ['jarvis', 'hotspotti', 'audit-trading'] as const;
export const DOSSIER_IDS = ['hvacops-ai'] as const;
export const HVACOPS_SECTION_IDS = [
  'cover',
  'executive-summary',
  'engagement-plan',
  'requirements',
  'architecture',
  'llm-reliability',
  'observability',
  'security',
  'what-i-built',
  'appendix',
] as const;

export type UiProjectId = (typeof UI_PROJECT_IDS)[number];
export type DossierId = (typeof DOSSIER_IDS)[number];
export type HvacopsSectionId = (typeof HVACOPS_SECTION_IDS)[number];
export const HVACOPS_DOSSIER_ID: DossierId = 'hvacops-ai';

export type PortfolioRouteState = {
  projectId: 'main' | 'hvacops' | UiProjectId;
  sectionId: 'main' | HvacopsSectionId | UiProjectId;
};

const asNormalizedPath = (pathname: string | null): string => {
  if (!pathname) return '/';
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '') || '/';
};

export const isUiProjectId = (value: string): value is UiProjectId =>
  (UI_PROJECT_IDS as readonly string[]).includes(value);

export const isDossierId = (value: string): value is DossierId =>
  (DOSSIER_IDS as readonly string[]).includes(value);

export const isHvacopsSectionId = (value: string): value is HvacopsSectionId =>
  (HVACOPS_SECTION_IDS as readonly string[]).includes(value);

export const resolvePortfolioPath = (pathname: string | null): PortfolioRouteState | null => {
  const normalized = asNormalizedPath(pathname);

  if (normalized === '/') {
    return { projectId: 'main', sectionId: 'main' };
  }

  if (normalized === `/dossiers/${HVACOPS_DOSSIER_ID}`) {
    return { projectId: 'hvacops', sectionId: 'cover' };
  }

  if (normalized.startsWith(`/dossiers/${HVACOPS_DOSSIER_ID}/`)) {
    const sectionId = normalized.slice(`/dossiers/${HVACOPS_DOSSIER_ID}/`.length);
    if (isHvacopsSectionId(sectionId)) {
      return { projectId: 'hvacops', sectionId };
    }
    return null;
  }

  if (normalized.startsWith('/projects/')) {
    const projectId = normalized.slice('/projects/'.length);
    if (isUiProjectId(projectId)) {
      return { projectId, sectionId: projectId };
    }
    return null;
  }

  return null;
};

export const getPortfolioPath = (projectId: string, sectionId: string): string => {
  if (projectId === 'main') return '/';
  if (projectId === 'hvacops') {
    return sectionId === 'cover'
      ? `/dossiers/${HVACOPS_DOSSIER_ID}`
      : `/dossiers/${HVACOPS_DOSSIER_ID}/${sectionId}`;
  }
  if (isUiProjectId(projectId)) {
    return `/projects/${projectId}`;
  }
  return '/';
};
