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

export function Mermaid({
  chart,
  onClick,
}: {
  chart: string;
  onClick?: (svg: string) => void;
}) {
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

  if (onClick) {
    return (
      <button
        type="button"
        className="mermaid-card is-clickable"
        onClick={() => onClick(svg)}
        aria-label="Open diagram"
      >
        <span className="sr-only">Open diagram</span>
        <span className="mermaid-body" dangerouslySetInnerHTML={{ __html: svg }} />
      </button>
    );
  }

  return <div className="mermaid-card" dangerouslySetInnerHTML={{ __html: svg }} />;
}
