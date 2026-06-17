"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const NAV = [
  { label: "Product", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header
      className="sticky top-0 z-[100] w-full transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(247,246,241,0.82)",
              backdropFilter: "saturate(1.4) blur(14px)",
              WebkitBackdropFilter: "saturate(1.4) blur(14px)",
              borderBottom: "1px solid #E7E5DC",
              boxShadow: "0 4px 20px -12px rgba(11,20,16,0.18)",
            }
          : { background: "rgba(247,246,241,0)", borderBottom: "1px solid transparent" }
      }
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6">
        <Logo />

        <nav className="flex items-center gap-1 max-[860px]:hidden">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[9px] px-[13px] py-2 text-sm font-medium no-underline transition-all duration-150"
                style={
                  active
                    ? { color: "#0A5C44", background: "rgba(10,92,68,0.07)" }
                    : { color: "#5B6B63" }
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 max-[860px]:hidden">
          <Link
            href="/dashboard"
            className="rounded-[9px] px-3 py-2 text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="rounded-[10px] bg-citron px-4 py-[9px] text-sm font-semibold text-ink no-underline shadow-[0_2px_8px_-2px_rgba(10,92,68,0.3)] transition-all duration-150 hover:-translate-y-px hover:brightness-[1.03] hover:shadow-[0_8px_18px_-6px_rgba(10,92,68,0.4)]"
          >
            Get API key
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
          className="hidden h-10 w-10 items-center justify-center rounded-[9px] border border-hairline bg-transparent text-ink max-[860px]:flex"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[200] flex flex-col bg-paper p-5"
          >
            <div className="flex h-11 items-center justify-between">
              <Logo href={null} />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-hairline bg-transparent text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-hairline py-3 font-display text-[30px] font-medium text-ink no-underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2.5">
              <Link
                href="/get-started"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-citron p-[15px] text-center text-base font-semibold text-ink no-underline"
              >
                Get API key
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-hairline p-[15px] text-center text-base font-medium text-ink no-underline"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
