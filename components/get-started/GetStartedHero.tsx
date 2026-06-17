/** Centered intro for the Get Started page. */
export function GetStartedHero() {
  return (
    <section className="mx-auto flex max-w-[860px] flex-col items-center gap-4 px-6 pb-10 pt-[72px] text-center">
      <h1 className="font-display text-[48px] font-semibold leading-[1.05] tracking-[-0.025em] text-balance max-[640px]:text-[36px]">
        Ship yield this week
      </h1>
      <p className="max-w-[520px] text-[18px] leading-[1.55] text-muted text-pretty">
        Grab a test key and start building now, or book a walkthrough with our team.
      </p>
    </section>
  );
}
