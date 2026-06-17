import Image from "next/image";

/** Thin reassurance strip + partner logos below the hero. */
export function TrustBar() {
  return (
    <section className="border-y border-hairline bg-card">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 px-6 py-[26px]">
        <span className="whitespace-nowrap text-[13px] font-medium text-muted">
          Regulated RWA · 24/7 settlement · T+0
        </span>
        <div className="flex flex-wrap items-center gap-9 opacity-80">
          <Image src="/brand/arc-wordmark-dark.svg" alt="Arc" width={64} height={22} unoptimized className="h-[22px] w-auto" />
          <Image src="/brand/circle-wordmark-dark.svg" alt="Circle" width={78} height={20} unoptimized className="h-[20px] w-auto" />
          <span className="text-base font-semibold text-muted-2">Hashnote</span>
          <span className="text-base font-semibold text-muted-2">Lumen Pay</span>
          <span className="text-base font-semibold text-muted-2">Northwind</span>
        </div>
      </div>
    </section>
  );
}
