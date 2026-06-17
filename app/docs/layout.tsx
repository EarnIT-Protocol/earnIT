import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/docs-layout.config";

// fumadocs docs shell (sidebar + nav + search + TOC), scoped to /docs.
// Theme switching is disabled — the site is light-only and brand-themed
// via the --color-fd-* overrides in globals.css.
export default function DocsRouteLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider theme={{ enabled: false }}>
      <DocsLayout tree={source.pageTree} {...baseOptions}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
