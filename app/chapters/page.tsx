import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { chapters } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Chapters",
  description: "The Shadow Co. universe, told one chapter at a time.",
};

export default function ChaptersPage() {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <RevealGroup>
          <RevealItem>
            <h1 className="text-head uppercase leading-[0.9]">Chapters</h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-lg text-lead text-muted">
              Shadow Co. doesn&rsquo;t release collections. It releases chapters — each one with its own
              name, its own voice, its own reason to exist.
            </p>
          </RevealItem>
        </RevealGroup>

        <ul className="mt-20 flex flex-col gap-3">
          {chapters.map((chapter) => (
            <li key={chapter.slug} className="bg-surface">
              <Link
                href={`/chapters/${chapter.slug}`}
                className="group block transition-colors hover:bg-surface-2"
              >
                <RevealGroup className="grid grid-cols-[1fr_auto] items-baseline gap-6 px-6 py-10 sm:px-8">
                  <RevealItem>
                    <span className="text-head uppercase leading-none">
                      {chapter.number} — {chapter.title}
                    </span>
                  </RevealItem>
                  <RevealItem>
                    <span className="shrink-0 text-small uppercase tracking-wide text-muted transition-colors group-hover:text-ink">
                      Enter →
                    </span>
                  </RevealItem>
                </RevealGroup>
              </Link>
            </li>
          ))}
          <Reveal delay={0.05 * chapters.length}>
            <li className="bg-surface px-6 py-10 text-muted sm:px-8">
              <span className="text-lead uppercase">002 — Unwritten</span>
            </li>
          </Reveal>
        </ul>
      </div>
    </div>
  );
}
