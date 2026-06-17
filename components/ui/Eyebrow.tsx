/** Uppercase forest section label used above headings across the site. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-[13px] font-semibold uppercase tracking-[0.08em] text-forest ${className}`}
    >
      {children}
    </span>
  );
}
