import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { GetStartedHero } from "@/components/get-started/GetStartedHero";
import { SelfServeCard } from "@/components/get-started/SelfServeCard";
import { BookDemoCard } from "@/components/get-started/BookDemoCard";

export const metadata: Metadata = {
  title: "Get Started — EarnIT",
  description: "Ship yield this week. Grab a test key or book a walkthrough.",
};

export default function GetStartedPage() {
  return (
    <SiteShell>
      <GetStartedHero />
      <section className="mx-auto max-w-[1000px] px-6 pb-20 pt-2">
        <div className="ew-gs grid grid-cols-2 items-start gap-5 max-[860px]:grid-cols-1">
          <SelfServeCard />
          <BookDemoCard />
        </div>
      </section>
    </SiteShell>
  );
}
