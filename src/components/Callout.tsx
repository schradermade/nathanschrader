type CalloutVariant = 'decision' | 'tradeoff' | 'risk' | 'mitigation' | 'warn';

const labels: Record<CalloutVariant, string> = {
  decision: 'Decision',
  tradeoff: 'Tradeoff',
  risk: 'Risk',
  mitigation: 'Mitigation',
  warn: 'Warning',
};

export function Callout({
  variant,
  children,
}: {
  variant: CalloutVariant;
  children: React.ReactNode;
}) {
  return (
    <div className={`callout ${variant}`}>
      <div className="label">{labels[variant]}</div>
      <div>{children}</div>
    </div>
  );
}
