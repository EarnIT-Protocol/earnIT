"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex max-w-[340px] flex-col gap-2">
      <span className="text-[13px] font-medium text-[#C7D2CB]">Ship updates, in your inbox</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubscribed(true);
        }}
        className="flex gap-2"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-[10px] border border-[rgba(231,229,220,0.16)] bg-[rgba(247,246,241,0.06)] px-[13px] py-2.5 text-[13.5px] text-paper outline-none focus:border-[rgba(198,242,78,0.4)]"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-[10px] bg-citron px-4 py-2.5 text-[13.5px] font-semibold text-ink"
        >
          {subscribed ? "Subscribed ✓" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
