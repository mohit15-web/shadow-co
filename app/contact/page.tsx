import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shadow Co.",
};

export default function ContactPage() {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[700px]">
        <Reveal>
          <h1 className="text-head uppercase leading-[0.9]">Contact</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-md text-lead text-muted">
            For general, press and wholesale enquiries, reach us directly. We read everything —
            we just don&rsquo;t answer everything at the same speed.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 flex flex-col gap-8">
          <RevealItem>
            <p className="text-small uppercase tracking-wide text-muted">Email</p>
            <a href="mailto:hello@shadowco.example" className="mt-2 block text-lead hover:opacity-70">
              hello@shadowco.example
            </a>
            <p className="mt-1 text-small text-muted">Placeholder address — to be confirmed before launch.</p>
          </RevealItem>
          <RevealItem>
            <p className="text-small uppercase tracking-wide text-muted">Instagram</p>
            <a
              href="https://www.instagram.com/wearshadowco.in?mdxt=dWIxeDh3NnY0bWhp"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-lead hover:opacity-70"
            >
              @wearshadowco.in
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </div>
  );
}
