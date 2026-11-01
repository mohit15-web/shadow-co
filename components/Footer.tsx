import Link from "next/link";
import { atmospherePhotos } from "@/lib/images";

const LEGAL = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns & exchanges" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms & conditions" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-paper text-paperink">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="grid gap-12 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h2 className="text-head leading-[0.95]">Join the chapter.</h2>
            <p className="mt-4 max-w-sm text-lead text-paperink/70">Before it closes.</p>
            <Link
              href="/chapters/the-unheard"
              className="mt-8 inline-block bg-paperink px-8 py-4 text-small uppercase tracking-wide text-paper transition-opacity hover:opacity-80"
            >
              Enter Chapter 001
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-small uppercase tracking-wide sm:col-span-3 sm:col-start-10">
            <a
              href="https://www.instagram.com/wearshadowco.in?mdxt=dWIxeDh3NnY0bWhp"
              className="hover:opacity-60"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="mailto:hello@shadowco.example" className="hover:opacity-60">
              Contact
            </a>
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:opacity-60">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 py-6 text-small">
          <span>&copy; {year} Shadow Co. All rights reserved.</span>
          <span className="max-w-md text-right text-body text-paperink/60">
            Atmosphere photography placeholder via Unsplash / Lorem Picsum:{" "}
            {atmospherePhotos.map((p) => p.credit).join(", ")}. Pending original campaign photography.
          </span>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="block translate-y-[28%] whitespace-nowrap font-display uppercase leading-none"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)" }}
        >
          Shadow Co.
        </span>
      </div>
    </footer>
  );
}
