import Image from "next/image";
import { Reveal } from "./Reveal";
import { atmospherePhotos, photoUrl } from "@/lib/images";

const PARAGRAPHS = [
  "They notice before anyone points it out. They question before they agree.",
  "They don't need the room's attention to know what they think — they already knew it before they walked in.",
  "Independence isn't a pose for them. It's just how they move through everything else.",
  "When they finally say something, it's because it was worth saying.",
];

export function PhilosophySection() {
  const photo = atmospherePhotos[3];
  return (
    <section className="bg-bg px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-12 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <Reveal>
            <h2 className="text-head uppercase leading-[0.95]">Who we are</h2>
          </Reveal>
          <div className="mt-12 flex flex-col gap-8">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={p} delay={0.05 * i}>
                <p className="max-w-xl text-lead leading-snug">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-14 max-w-md text-body text-muted">
              We don&rsquo;t need to speak about everything. We choose what deserves to be said.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative sm:col-span-4 sm:col-start-9">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={photoUrl(photo.id)}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
