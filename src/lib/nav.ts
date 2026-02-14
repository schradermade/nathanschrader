export type NavItem = {
  title: string;
  href: string;
};

export const navItems: NavItem[] = [
  { title: 'Cover', href: '/dossiers/hvacops-ai' },
  { title: 'Executive Summary', href: '/dossiers/hvacops-ai/executive-summary' },
  { title: 'Engagement Plan', href: '/dossiers/hvacops-ai/engagement-plan' },
  { title: 'Requirements & Constraints', href: '/dossiers/hvacops-ai/requirements' },
  { title: 'Architecture', href: '/dossiers/hvacops-ai/architecture' },
  { title: 'LLM Reliability Plan', href: '/dossiers/hvacops-ai/llm-reliability' },
  { title: 'Observability & Operations', href: '/dossiers/hvacops-ai/observability' },
  { title: 'Security & Privacy', href: '/dossiers/hvacops-ai/security' },
  { title: 'What I Built So Far', href: '/dossiers/hvacops-ai/what-i-built' },
  { title: 'Appendix', href: '/dossiers/hvacops-ai/appendix' },
];
