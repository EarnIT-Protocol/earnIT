import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/brand/Logo";

// Shared chrome for the fumadocs docs surface — keeps the brand wordmark
// and cross-links to the rest of the site consistent with SiteHeader.
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo href={null} size={30} />,
    transparentMode: "top",
  },
  githubUrl: "https://github.com/earnit/protocol",
  links: [
    { type: "main", text: "Home", url: "/" },
    { type: "main", text: "Playground", url: "/playground" },
    { type: "main", text: "Pricing", url: "/pricing" },
    { type: "main", text: "Dashboard", url: "/dashboard" },
  ],
};
