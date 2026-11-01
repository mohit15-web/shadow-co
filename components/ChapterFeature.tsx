import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowLink } from "./ArrowLink";
import { atmospherePhotos, photoUrl } from "@/lib/images";
import type { Chapter } from "@/lib/chapters";

export function ChapterFeature({ chapter }: { chapter: Chapter }) {
  const photo = atmospherePhotos[1];
  return (
    <section className="relative bg-surface px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="text-head uppercase leading-[0.9]">
            Chapter {chapter.number}
            <br />
            {chapter.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lead uppercase leading-snug text-ink/90">
            &ldquo;{chapter.tagline}&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-14 aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={photoUrl(photo.id)}
            alt={photo.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
          />
        </Reveal>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-small uppercase tracking-wide text-muted">{chapter.statement}</p>
          <ArrowLink href={`/chapters/${chapter.slug}`}>Enter Chapter {chapter.number}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
