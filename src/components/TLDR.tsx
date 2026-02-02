export function TLDR({ items }: { items: string[] }) {
  return (
    <section className="tldr" aria-label="TLDR summary">
      <h3>TL;DR</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
