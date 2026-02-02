export type NavItem = {
  title: string;
  href: string;
};

export const navItems: NavItem[] = [
  { title: 'Cover', href: '/hvacops' },
  { title: 'Executive Summary', href: '/hvacops/executive-summary' },
  { title: 'Engagement Plan', href: '/hvacops/engagement-plan' },
  { title: 'Requirements & Constraints', href: '/hvacops/requirements' },
  { title: 'Architecture', href: '/hvacops/architecture' },
  { title: 'LLM Reliability Plan', href: '/hvacops/llm-reliability' },
  { title: 'Observability & Operations', href: '/hvacops/observability' },
  { title: 'Security & Privacy', href: '/hvacops/security' },
  { title: 'What I Built So Far', href: '/hvacops/what-i-built' },
  { title: 'Appendix', href: '/hvacops/appendix' }
];
