import { Reveal } from "./Reveal";

export function NextChapterTeaser() {
  return (
    <section className="flex flex-col items-center justify-center bg-surface px-5 py-32 text-center sm:px-8 sm:py-40">
      <Reveal>
        <h2 className="text-head uppercase leading-[0.9]">
          This is only
          <br />
          the beginning.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-8 max-w-sm text-body text-ink/80">
          The next chapter hasn&rsquo;t found its voice yet. No name. No date. It will arrive when it&rsquo;s ready to be said.
        </p>
      </Reveal>
    </section>
  );
}
