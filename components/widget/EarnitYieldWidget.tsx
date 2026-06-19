"use client";

import { type CSSProperties, useMemo, useState } from "react";
import { MOCK_VAULT } from "@/lib/mock/vault";
import { TokenGlyph } from "./TokenGlyph";
import type { DisplayCurrency, EarnitYieldWidgetProps, WidgetTab } from "./types";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

/** Picks black/white text for legibility on an arbitrary accent color. */
function readableOn(hex?: string): string {
  if (!hex) return "#0B1410";
  const c = hex.replace("#", "");
  if (c.length < 6) return "#0B1410";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0B1410" : "#FFFFFF";
}

function fmtNum(n: number, d = 2): string {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function fmtMoney(n: number, ccy: DisplayCurrency, d = 2): string {
  return (ccy === "NGN" ? "₦" : "$") + fmtNum(n, d);
}

/**
 * The embeddable deposit/withdraw card — the core product. White-labelled
 * entirely through CSS custom properties computed from props, so partners
 * restyle it without touching markup. Presentational: deposit/withdraw and
 * connect bubble up via onSubmit/onConnect.
 */
export function EarnitYieldWidget(props: EarnitYieldWidgetProps) {
  const {
    primaryColor = "#0A5C44",
    accentColor = "#C6F24E",
    radius = 20,
    theme = "light",
    asset = "USDC",
    displayCurrency = "USD",
    vaultName = "USDC Vault",
    showApy = true,
    showWithdraw = true,
    fontFamily = "General Sans",
    connected = false,
    onConnect,
    onSubmit,
  } = props;

  const model = useMemo(
    () => ({
      apy: props.apy ?? MOCK_VAULT.apy,
      apy30: props.apy30 ?? MOCK_VAULT.apy30,
      sharePrice: props.sharePrice ?? MOCK_VAULT.sharePrice,
      balance: props.balance ?? MOCK_VAULT.balance,
      positionShares: props.positionShares ?? MOCK_VAULT.positionShares,
      yieldEarned: props.yieldEarned ?? MOCK_VAULT.yieldEarned,
    }),
    [props.apy, props.apy30, props.sharePrice, props.balance, props.positionShares, props.yieldEarned],
  );

  const [tab, setTab] = useState<WidgetTab>("deposit");
  const [amount, setAmount] = useState("");
  const [ctaHover, setCtaHover] = useState(false);

  const isDep = showWithdraw ? tab === "deposit" : true;
  const amt = parseFloat(amount) || 0;
  const sharesOut = amt / model.sharePrice;
  const usdcOut = amt * model.sharePrice;

  const dark = theme === "dark";
  const rootVars: CSSVars = {
    "--ew-primary": primaryColor,
    "--ew-accent": accentColor,
    "--ew-radius": `${radius}px`,
    "--ew-font": fontFamily,
    "--ew-surface": dark ? "#0F1A15" : "#FFFFFF",
    "--ew-canvas": dark ? "#16241D" : "#FCFBF7",
    "--ew-text": dark ? "#F4F6F1" : "#0B1410",
    "--ew-muted": dark ? "#9DB0A6" : "#5B6B63",
    "--ew-hair": dark ? "#27362E" : "#E7E5DC",
    "--ew-inputBorder": dark ? "#33453B" : "#E7E5DC",
    "--ew-apyText": accentColor === "#C6F24E" || !accentColor ? primaryColor : accentColor,
    "--ew-onAccent": readableOn(accentColor),
  };

  const money = (n: number, d = 2) => fmtMoney(n, displayCurrency, d);

  const setPct = (f: number) => {
    const base = isDep ? model.balance : model.positionShares;
    setAmount(base * f ? (base * f).toFixed(2) : "");
  };

  const tabBtn = (on: boolean): CSSProperties => ({
    flex: 1,
    padding: "9px",
    border: "none",
    borderRadius: 9,
    fontFamily: "var(--ew-font), sans-serif",
    fontSize: "13.5px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .18s",
    background: on ? "var(--ew-surface)" : "transparent",
    color: on ? "var(--ew-text)" : "var(--ew-muted)",
    boxShadow: on ? "0 1px 2px rgba(11,20,16,.08)" : undefined,
  });

  const pctStyle: CSSProperties = {
    padding: "7px 0",
    border: "1px solid var(--ew-hair)",
    borderRadius: 9,
    background: "var(--ew-surface)",
    color: "var(--ew-muted)",
    fontFamily: "var(--font-mono), monospace",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all .15s",
  };

  const ctaStyle: CSSProperties = {
    width: "100%",
    padding: 14,
    border: "none",
    borderRadius: 13,
    fontFamily: "var(--ew-font), sans-serif",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .2s",
    letterSpacing: "-.01em",
    background: "var(--ew-accent)",
    color: "var(--ew-onAccent)",
    transform: ctaHover ? "translateY(-1px)" : undefined,
    filter: ctaHover ? "brightness(1.03)" : undefined,
    boxShadow: ctaHover
      ? "0 8px 20px -6px rgba(10,92,68,.4)"
      : "0 2px 8px -2px rgba(10,92,68,.25)",
  };

  const onCta = () => {
    if (!connected) return onConnect?.();
    onSubmit?.(isDep ? "deposit" : "withdraw", amt);
  };

  const balanceDisplay = fmtNum(isDep ? model.balance : model.positionShares) + (isDep ? ` ${asset}` : " sh");

  return (
    <div
      style={{
        ...rootVars,
        fontFamily: "var(--ew-font), system-ui, sans-serif",
        width: "100%",
        maxWidth: 400,
        background: "var(--ew-surface)",
        border: "1px solid var(--ew-hair)",
        borderRadius: "var(--ew-radius)",
        boxShadow: "0 1px 2px rgba(11,20,16,.04),0 12px 32px -12px rgba(11,20,16,.12)",
        overflow: "hidden",
        color: "var(--ew-text)",
      }}
    >
      {/* Header */}
      <div style={{ padding: "18px 18px 0 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <TokenGlyph asset={asset} size={40} dark={dark} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>{vaultName}</span>
              {/* <span style={{ fontSize: 12, color: "var(--ew-muted)", fontFamily: "var(--font-mono), monospace" }}>
                {asset} · Treasury
              </span> */}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              border: "1px solid var(--ew-hair)",
              borderRadius: 999,
              background: "var(--ew-canvas)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--ew-primary)",
                animation: "ew-pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--ew-muted)", letterSpacing: ".02em" }}>
              Live
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["USYC Strategy"].map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                whiteSpace: "nowrap",
                fontSize: 11,
                fontWeight: 500,
                padding: "4px 9px",
                borderRadius: 7,
                background: "var(--ew-canvas)",
                border: "1px solid var(--ew-hair)",
                color: "var(--ew-muted)",
              }}
            >
              {tag === "USYC Strategy" && <TokenGlyph asset="USYC" size={14} dark={dark} />}
              {tag === "Arc" && <TokenGlyph asset="Arc" size={13} dark={dark} />}
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* APY */}
      {showApy && (
        <div
          style={{
            padding: "16px 18px 4px 18px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ew-muted)", letterSpacing: ".02em" }}>
              Estimated APY
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 600,
                fontSize: 46,
                lineHeight: 1,
                letterSpacing: "-.02em",
                color: "var(--ew-apyText)",
                fontFeatureSettings: "'tnum' 1",
              }}
            >
              {fmtNum(model.apy)}%
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
              paddingBottom: 4,
            }}
          >
            <span style={{ whiteSpace: "nowrap", fontSize: 11, color: "var(--ew-muted)" }}>30-day avg</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontWeight: 500, fontSize: 14, color: "var(--ew-text)" }}>
              {fmtNum(model.apy30)}%
            </span>
          </div>
        </div>
      )}

      {/* Sparkline */}
      <div style={{ padding: "8px 14px 12px 14px" }}>
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ width: "100%", height: 72, display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="ewArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ew-primary)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--ew-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,140 L25,135 L50,138 L75,128 L100,132 L125,120 L150,124 L175,110 L200,116 L225,104 L250,108 L275,96 L300,100 L325,88 L350,94 L375,82 L400,86 L425,74 L450,80 L475,68 L500,72 L525,60 L550,66 L575,56 L600,58 L600,200 L0,200 Z"
            fill="url(#ewArea)"
          />
          <path
            d="M0,140 L25,135 L50,138 L75,128 L100,132 L125,120 L150,124 L175,110 L200,116 L225,104 L250,108 L275,96 L300,100 L325,88 L350,94 L375,82 L400,86 L425,74 L450,80 L475,68 L500,72 L525,60 L550,66 L575,56 L600,58"
            fill="none"
            stroke="var(--ew-accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="600" cy="58" r="4.5" fill="var(--ew-accent)" stroke="var(--ew-surface)" strokeWidth="2" />
        </svg>
      </div>

      {/* Action area */}
      <div style={{ padding: "0 18px 18px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: "var(--ew-canvas)",
            border: "1px solid var(--ew-hair)",
            borderRadius: 12,
          }}
        >
          <button type="button" onClick={() => { setTab("deposit"); setAmount(""); }} style={tabBtn(isDep)}>
            Deposit
          </button>
          {showWithdraw && (
            <button type="button" onClick={() => { setTab("withdraw"); setAmount(""); }} style={tabBtn(!isDep)}>
              Withdraw
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ whiteSpace: "nowrap", fontSize: 12, fontWeight: 500, color: "var(--ew-muted)" }}>
              {isDep ? "You deposit" : "You withdraw"}
            </span>
            <span style={{ whiteSpace: "nowrap", fontSize: 12, color: "var(--ew-muted)" }}>
              Balance:{" "}
              <span style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ew-text)" }}>
                {balanceDisplay}
              </span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 12,
              border: "1.5px solid var(--ew-inputBorder)",
              borderRadius: 13,
              background: "var(--ew-canvas)",
              transition: "border-color .15s",
            }}
          >
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              placeholder="0.00"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 24,
                fontWeight: 500,
                color: "var(--ew-text)",
                letterSpacing: "-.01em",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 10px",
                background: "var(--ew-surface)",
                border: "1px solid var(--ew-hair)",
                borderRadius: 999,
                flexShrink: 0,
              }}
            >
              <TokenGlyph asset={asset} size={18} dark={dark} />
              <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-mono), monospace" }}>{asset}</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
            {([["25%", 0.25], ["50%", 0.5], ["75%", 0.75], ["Max", 1]] as const).map(([label, f]) => (
              <button key={label} type="button" onClick={() => setPct(f)} style={pctStyle}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            padding: "13px 14px",
            background: "var(--ew-canvas)",
            border: "1px solid var(--ew-hair)",
            borderRadius: 13,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12.5px", color: "var(--ew-muted)" }}>
              {isDep ? "You receive (shares)" : "You receive"}
            </span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, fontWeight: 500 }}>
              {isDep ? `${fmtNum(sharesOut, 4)} sh` : money(usdcOut)}
            </span>
          </div>
          <div style={{ height: 1, background: "var(--ew-hair)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12.5px", color: "var(--ew-muted)" }}>Vault share value</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, fontWeight: 500 }}>
              {money(model.sharePrice, 4)}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12.5px", color: "var(--ew-muted)" }}>Est. annual return</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, fontWeight: 600, color: "var(--ew-primary)" }}>
              {money((isDep ? amt : usdcOut) * (model.apy / 100))}
            </span>
          </div>
        </div>

        <button
          type="button"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          onClick={onCta}
          style={ctaStyle}
        >
          {connected ? (isDep ? `Deposit ${asset}` : "Withdraw") : "Connect Wallet"}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 11, color: "var(--ew-muted)" }}>Your position</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 600 }}>
              {money(model.positionShares * model.sharePrice)}
            </span>
          </div>
          <div style={{ width: 1, height: 26, background: "var(--ew-hair)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 1, textAlign: "right" }}>
            <span style={{ fontSize: 11, color: "var(--ew-muted)" }}>Yield earned</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 600, color: "var(--ew-primary)" }}>
              +{money(model.yieldEarned)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
