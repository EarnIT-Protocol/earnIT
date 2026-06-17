import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Playground", href: "/playground" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "SDK Reference", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/get-started" },
      { label: "Careers", href: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Compliance", href: "/security" },
      { label: "Terms", href: "/" },
      { label: "Privacy", href: "/" },
      { label: "Audits", href: "/security" },
    ],
  },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "X",
    href: "/",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "GitHub",
    href: "/docs",
    path: "M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56v-2.2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.82 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.25 2.87.12 3.17.77.83 1.23 1.88 1.23 3.17 0 4.52-2.81 5.51-5.49 5.81.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.83.56C20.57 21.91 24 17.5 24 12.29 24 5.78 18.63.5 12 .5z",
  },
  {
    label: "LinkedIn",
    href: "/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink font-sans text-[#C7D2CB]">
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-16">
        <div className="flex justify-between gap-16 border-b border-[rgba(231,229,220,0.1)] pb-12 max-[860px]:flex-col max-[860px]:gap-8">
          <div className="flex max-w-[300px] flex-col gap-4">
            <Logo textColor="#F7F6F1" />
            <p className="m-0 text-sm leading-[1.55] text-[#8FA39A]">
              The yield engine consumer apps run on. Embed regulated real-world-asset yield with one
              SDK.
            </p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(198,242,78,0.18)] bg-[rgba(10,92,68,0.25)] px-3 py-[7px]">
              <span className="h-[7px] w-[7px] rounded-full bg-citron" />
              <span className="whitespace-nowrap text-xs font-medium text-[#C7D2CB]">
                Built on Arc · Powered by Circle USYC
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-10 max-[860px]:grid-cols-2">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">
                  {col.title}
                </span>
                {col.links.map((link, i) => (
                  <Link
                    key={`${link.label}-${i}`}
                    href={link.href}
                    className="w-fit text-sm text-[#8FA39A] no-underline transition-colors duration-150 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-7">
          <NewsletterForm />
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(231,229,220,0.14)] text-[#8FA39A] no-underline transition-all duration-150 hover:border-[rgba(198,242,78,0.4)] hover:text-paper"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(231,229,220,0.08)] pt-5">
          <span className="font-mono text-[12.5px] text-muted">© 2026 EarnIT Labs, Inc.</span>
          <span className="text-xs text-muted">
            Regulated RWA · 24/7 settlement · T+0 redemptions
          </span>
        </div>
      </div>
    </footer>
  );
}
