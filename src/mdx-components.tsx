import type { MDXComponents } from 'mdx/types';
import { TLDR } from '@/components/TLDR';
import { Callout } from '@/components/Callout';
import { Mermaid } from '@/components/Mermaid';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TLDR,
    Callout,
    Mermaid,
    ...components,
  };
}
