import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Status", href: "/security" },
  { label: "Support", href: "/get-started" },
];

/** Slim footer pinned to the bottom of the dashboard main column. */
export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-hairline px-4 py-4 sm:px-6 lg:px-7">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[12px] text-muted-2">© 2026 EarnIT Labs, Inc.</span>
        <div className="flex items-center gap-4">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[12.5px] text-muted no-underline transition-colors hover:text-forest"
            >
              {l.label}
            </Link>
          ))}
          <span className="hidden items-center gap-1.5 text-[12px] text-muted-2 sm:flex">
            <Image src="/brand/arc-icon-dark.svg" alt="Arc" width={13} height={13} unoptimized className="h-[13px] w-auto" />
            <Image src="/brand/circle-icon-dark.svg" alt="Circle" width={13} height={13} unoptimized className="h-[13px] w-auto" />
            Built on Arc · Circle USYC
          </span>
        </div>
      </div>
    </footer>
  );
}
