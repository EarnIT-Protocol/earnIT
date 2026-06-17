import Image from "next/image";

// Official brand marks (see /public/brand). Light/dark pick the variant that
// reads on the current surface; self-colored coins use one asset for both.
const MARKS: Record<string, { light: string; dark: string; label: string }> = {
  USDC: { light: "/brand/usdc.svg", dark: "/brand/usdc.svg", label: "USDC" },
  EURC: { light: "/brand/eurc.svg", dark: "/brand/eurc.svg", label: "EURC" },
  USYC: { light: "/brand/usyc-light.svg", dark: "/brand/usyc-dark.svg", label: "USYC" },
  CNGN: { light: "/brand/cngn-purple.png", dark: "/brand/cngn-white.png", label: "cNGN" },
  ARC: { light: "/brand/arc-icon-dark.svg", dark: "/brand/arc-icon-light.svg", label: "Arc" },
};

/** Official brand glyph for a token/network. Falls back to the symbol initial. */
export function TokenGlyph({ asset, size = 40, dark = false }: { asset: string; size?: number; dark?: boolean }) {
  const m = MARKS[asset.toUpperCase()];

  if (!m) {
    return (
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#0A5C44,#7FBF52)",
          color: "#fff",
          fontWeight: 600,
          fontSize: Math.round(size * 0.44),
          fontFamily: "var(--font-mono), monospace",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {asset.charAt(0)}
      </span>
    );
  }

  return (
    <Image
      src={dark ? m.dark : m.light}
      alt={m.label}
      width={size}
      height={size}
      unoptimized
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
    />
  );
}
