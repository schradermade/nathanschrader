export function TLDR({ items, className }: { items: string[]; className?: string }) {
  const classes = className ? `tldr ${className}` : 'tldr';
  return (
    <section className={classes} aria-label="TLDR summary">
      <div className="tldr-items">
        {items.map((item) => (
          <div key={item} className="tldr-item">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
