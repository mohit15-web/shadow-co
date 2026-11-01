import { Reveal } from "./Reveal";

export function LimitedRelease() {
  return (
    <section className="bg-paper px-5 py-28 text-paperink sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="text-head uppercase leading-[0.9]">Not made for everyone.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-xl text-lead uppercase leading-snug text-paperink/80">
            Made for those who understand.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-2 text-lead uppercase text-paperink/80 sm:flex-row sm:items-baseline sm:gap-8">
            <span>Drop 001 — Limited release</span>
            <span>18 pieces. No artificial hype.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
