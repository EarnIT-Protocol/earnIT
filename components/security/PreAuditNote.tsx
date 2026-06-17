import { AlertTriangle } from "lucide-react";

/** Honest disclosure: contracts are pre-audit and on testnet only. */
export function PreAuditNote() {
  return (
    <section className="mx-auto max-w-[880px] px-6 pb-6 pt-16">
      <div className="flex gap-[14px] rounded-[16px] border border-[rgba(201,154,46,0.28)] bg-[rgba(201,154,46,0.07)] px-6 py-[22px]">
        <AlertTriangle
          className="mt-px size-[22px] shrink-0 text-[#C99A2E]"
          strokeWidth={2}
        />
        <div className="flex flex-col gap-[5px]">
          <span className="text-[16px] font-semibold text-ink">
            Honest status: pre-audit, testnet
          </span>
          <span className="text-[14.5px] leading-[1.6] text-muted">
            The core contracts are deployed to Arc testnet and are undergoing a formal audit before
            mainnet. Don&apos;t deposit funds you can&apos;t afford to lose on testnet. We&apos;ll
            publish the full audit report here when it lands.
          </span>
        </div>
      </div>
    </section>
  );
}
