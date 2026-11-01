import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "The philosophy behind Shadow Co.",
};

const SECTIONS = [
  {
    heading: "The observers",
    body: "Shadow Co. is built for people who notice before anyone points it out — who question what everyone else accepts without asking why. Not loud about it. Just aware.",
  },
  {
    heading: "Chosen, not constant",
    body: "They aren't antisocial. They aren't cold. They simply choose what deserves their attention, their energy, and their voice — and when they speak, it means something, because it doesn't happen by default.",
  },
  {
    heading: "A series, not a drop",
    body: "The brand doesn't release collections. It releases chapters. Each one has its own name, its own narrative, its own reason to exist — connected by the same philosophy, never repeating itself.",
  },
  {
    heading: "What it isn't",
    body: "Not another logo-first streetwear store. Not noise dressed as a brand. Every piece carries an idea before it carries a graphic.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <h1 className="text-head uppercase leading-[0.9]">Who we are</h1>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {SECTIONS.map((s) => (
            <RevealGroup key={s.heading}>
              <RevealItem>
                <h2 className="text-small uppercase tracking-wide text-muted">{s.heading}</h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-2xl text-lead leading-snug">{s.body}</p>
              </RevealItem>
            </RevealGroup>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-24 bg-surface px-6 py-12 sm:px-10">
          <blockquote className="max-w-xl text-lead uppercase leading-snug">
            We don&rsquo;t need to speak about everything.
            <br />
            We choose what deserves to be said.
          </blockquote>
        </Reveal>
      </div>
    </div>
  );
}
