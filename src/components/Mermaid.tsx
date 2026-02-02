'use client';

import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e8f5f2',
    primaryBorderColor: '#94a3b8',
    lineColor: '#334155',
    textColor: '#1f2937',
    fontFamily: 'IBM Plex Sans',
  },
});

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('');
  const id = useId().replace(/:/g, '');

  useEffect(() => {
    let active = true;
    mermaid
      .render(`mermaid-${id}`, chart)
      .then((result) => {
        if (active) setSvg(result.svg);
      })
      .catch(() => {
        if (active) setSvg('<pre>Diagram failed to render.</pre>');
      });
    return () => {
      active = false;
    };
  }, [chart, id]);

  return <div className="mermaid-card" dangerouslySetInnerHTML={{ __html: svg }} />;
}
