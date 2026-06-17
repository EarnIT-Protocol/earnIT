import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "./providers";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
});

const SITE_URL = "https://earnit-rho.vercel.app";
const TITLE = "EarnIT — The yield engine consumer apps run on";
const DESCRIPTION =
  "Embed regulated real-world-asset yield in an afternoon. One SDK routes stablecoin deposits into Circle USYC treasury yield on Arc — your users earn, you earn a fee share.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · EarnIT",
  },
  description: DESCRIPTION,
  applicationName: "EarnIT",
  keywords: [
    "EarnIT",
    "RWA yield",
    "real-world assets",
    "USYC",
    "Circle",
    "Arc",
    "stablecoin yield",
    "ERC-4626",
    "fintech infrastructure",
    "embedded yield",
    "DeFi",
  ],
  authors: [{ name: "EarnIT" }],
  creator: "EarnIT",
  alternates: { canonical: "/" },
  // og:image, twitter:image and the favicon are emitted automatically from the
  // app/opengraph-image.png and app/icon.svg file conventions — no manual entries.
  openGraph: {
    type: "website",
    siteName: "EarnIT",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
