import type { AttractionCategoryCount } from "@/data/attractionCategories";

export function AttractionCategoryStats({
  counts,
}: Readonly<{
  counts: AttractionCategoryCount[];
}>) {
  if (counts.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2 mb-5" aria-label="Categorías del parque">
      {counts.map(({ category, count, label, emoji }) => (
        <li
          key={category}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-sm shadow-sm"
        >
          <span aria-hidden="true">{emoji}</span>
          <span className="font-display font-bold text-ink tabular-nums">
            {count}
          </span>
          <span className="text-ink/70">{label}</span>
        </li>
      ))}
    </ul>
  );
}
