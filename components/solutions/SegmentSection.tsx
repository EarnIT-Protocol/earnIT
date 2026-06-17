import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SegmentSectionProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Optional CTA link rendered under the copy. */
  cta?: { label: string; href: string };
  /** The visual placed alongside the copy. */
  art: React.ReactNode;
  /** When true the art renders on the left (copy on the right). */
  artFirst?: boolean;
  /** Subtle warm fill used to alternate section backgrounds. */
  tinted?: boolean;
  /** Extra content (e.g. a stat row or check list) rendered after the body. */
  children?: React.ReactNode;
}

/**
 * A two-column solution segment: copy on one side, an illustrative card on the
 * other. The art order flips per row and collapses to a single column below
 * 900px (art on top via the `ew-seg-art` order rule).
 */
export function SegmentSection({
  eyebrow,
  title,
  body,
  cta,
  art,
  artFirst = false,
  tinted = false,
  children,
}: SegmentSectionProps) {
  const copy = (
    <div className="flex flex-col gap-[18px]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(10,92,68,0.07)] px-[11px] py-[5px] text-[12px] font-semibold uppercase tracking-[0.06em] text-forest">
        {eyebrow}
      </span>
      <h2 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
        {title}
      </h2>
      <p className="text-[16.5px] leading-[1.6] text-muted text-pretty">{body}</p>
      {children}
      {cta && (
        <Link
          href={cta.href}
          className="mt-1 inline-flex w-fit items-center gap-[7px] text-[15px] font-semibold text-forest"
        >
          {cta.label}
          <ArrowRight className="size-4" strokeWidth={2.2} />
        </Link>
      )}
    </div>
  );

  const artCol = (
    <div className="ew-seg-art flex justify-center">{art}</div>
  );

  return (
    <section className={`border-t border-hairline ${tinted ? "bg-card" : ""}`}>
      <div className="ew-seg mx-auto grid max-w-[1140px] grid-cols-2 items-center gap-14 px-6 py-20 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        {artFirst ? (
          <>
            {artCol}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {artCol}
          </>
        )}
      </div>
    </section>
  );
}
