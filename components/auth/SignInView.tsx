"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const SSO = [
  {
    label: "Google",
    path: "M21.35 11.1H12v2.92h5.35c-.23 1.4-1.7 4.1-5.35 4.1A5.62 5.62 0 1 1 12 6.4c1.6 0 2.67.68 3.28 1.27l2.24-2.16C16.1 4.18 14.25 3.4 12 3.4a8.6 8.6 0 1 0 0 17.2c4.96 0 8.25-3.49 8.25-8.4 0-.56-.06-1-.15-1.1z",
    fill: "#5B6B63",
  },
  {
    label: "GitHub",
    path: "M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56v-2.2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.82 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.25 2.87.12 3.17.77.83 1.23 1.88 1.23 3.17 0 4.52-2.81 5.51-5.49 5.81.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.83.56C20.57 21.91 24 17.5 24 12.29 24 5.78 18.63.5 12 .5z",
    fill: "#0B1410",
  },
];

const inputClass =
  "w-full rounded-[11px] border border-hairline bg-white px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-2 focus:border-forest focus:ring-2 focus:ring-forest/15";

export function SignInView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock auth — any submit/SSO routes into the dashboard.
  const signIn = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 600);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(150deg,#0A5C44,#0B3B2D)] p-12 text-paper lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-24 h-[360px] w-[360px] bg-[radial-gradient(circle,rgba(198,242,78,0.18),rgba(198,242,78,0)_70%)]" />
        <Logo textColor="#F7F6F1" />
        <div className="relative flex flex-col gap-5">
          <h1 className="max-w-[420px] font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-paper">
            The yield engine consumer apps run on.
          </h1>
          <p className="max-w-[380px] text-[15px] leading-[1.6] text-[#A9C4B8]">
            Manage your API keys, watch yield accrue, and track your fee-share — all from one place.
          </p>
          <div className="mt-2 flex items-center gap-2 text-[13px] text-[#C7D2CB]">
            <span className="h-[7px] w-[7px] rounded-full bg-citron" />
            Built on Arc · Powered by Circle USYC
          </div>
        </div>
        <span className="relative font-mono text-[12px] text-[#7E9A8E]">© 2026 EarnIT Labs, Inc.</span>
      </div>

      {/* Form */}
      <div className="flex flex-col bg-paper px-5 py-8 sm:px-8">
        <div className="flex justify-between lg:hidden">
          <Logo />
          <Link href="/" className="text-[13px] font-medium text-muted no-underline hover:text-ink">
            Back home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[380px]">
            <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] text-ink">Welcome back</h2>
            <p className="mt-1.5 text-[14px] text-muted">Sign in to your EarnIT partner dashboard.</p>

            <form
              className="mt-7 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-text-3">Work email</span>
                <input type="email" required placeholder="you@company.com" className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-text-3">Password</span>
                  <Link href="/signin" className="text-[12.5px] font-medium text-forest no-underline hover:underline">
                    Forgot?
                  </Link>
                </div>
                <input type="password" required placeholder="••••••••" className={inputClass} />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex items-center justify-center gap-2 rounded-[11px] bg-citron px-4 py-3 text-[15px] font-semibold text-ink shadow-[0_2px_8px_-2px_rgba(10,92,68,0.3)] transition-all hover:-translate-y-px hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} strokeWidth={2.2} />}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-[12px] text-muted-2">
              <span className="h-px flex-1 bg-hairline" />
              or continue with
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SSO.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={signIn}
                  className="flex items-center justify-center gap-2 rounded-[11px] border border-hairline bg-white px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-muted-2"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill={s.fill}>
                    <path d={s.path} />
                  </svg>
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mt-7 text-center text-[13.5px] text-muted">
              New to EarnIT?{" "}
              <Link href="/get-started" className="font-semibold text-forest no-underline hover:underline">
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
