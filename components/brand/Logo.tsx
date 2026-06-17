import Link from "next/link";

export const LOGO_GRADIENT =
  "linear-gradient(140deg,#0A5C44 0%,#0A5C44 38%,#7FBF52 78%,#C6F24E 100%)";

type LogoProps = {
  /** Square mark edge length in px. Wordmark scales from it. */
  size?: number;
  withWordmark?: boolean;
  /** Wordmark color — ink on light surfaces, paper on dark. */
  textColor?: string;
  href?: string | null;
  className?: string;
};

/** The gradient sprout mark + "EarnIT" wordmark. Links home unless href is null. */
export function Logo({
  size = 34,
  withWordmark = true,
  textColor = "#0B1410",
  href = "/",
  className = "",
}: LogoProps) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="flex items-center justify-center shadow-[0_3px_10px_-2px_rgba(10,92,68,0.45)]"
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.29),
          background: LOGO_GRADIENT,
        }}
      >
        <svg
          width={Math.round(size * 0.56)}
          height={Math.round(size * 0.56)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F7F6F1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6c-.9.5-2.1 1.5-2.7 3.5-.3 1.1-.2 2.4.3 3.5 1.7-.5 3-1 3.7-2.2.5-.9.7-2.3.5-3.6 0-1.8-.6-3-.6-3z" />
        </svg>
      </span>
      {withWordmark && (
        <span
          className="font-display font-semibold"
          style={{ fontSize: Math.round(size * 0.59), letterSpacing: "-0.01em", color: textColor }}
        >
          EarnIT
        </span>
      )}
    </span>
  );

  if (href === null) return mark;
  return (
    <Link href={href} className="flex items-center no-underline shrink-0">
      {mark}
    </Link>
  );
}
