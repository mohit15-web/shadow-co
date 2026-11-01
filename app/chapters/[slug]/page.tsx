import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";
import { ThreeDesigns } from "@/components/ThreeDesigns";
import { chapters, getChapter } from "@/lib/chapters";
import { getProductsByChapter } from "@/lib/products";
import { atmospherePhotos, photoUrl } from "@/lib/images";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.statement };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const products = getProductsByChapter(chapter.slug);
  const hero = atmospherePhotos[1];

  return (
    <div>
      <section className="relative flex h-[90svh] flex-col justify-between overflow-hidden bg-bg px-5 py-10 sm:px-8 sm:py-14">
        <Image
          src={photoUrl(hero.id)}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/60" />

        <p className="relative text-small uppercase tracking-wide">Chapter {chapter.number}</p>

        <div className="relative max-w-3xl">
          <h1 className="text-display font-display uppercase leading-[0.88]">{chapter.title}</h1>
          <p className="mt-6 max-w-xl text-lead uppercase leading-snug">&ldquo;{chapter.tagline}&rdquo;</p>
          <a
            href="#the-designs"
            className="mt-8 inline-block border border-ink px-7 py-4 text-small uppercase tracking-wide transition-colors hover:bg-ink hover:text-bg"
          >
            See the designs ↓
          </a>
        </div>
      </section>

      <section className="bg-bg px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 sm:grid-cols-12">
          <Reveal className="sm:col-span-4">
            <h2 className="text-small uppercase tracking-wide text-muted">The story</h2>
          </Reveal>
          <RevealGroup className="flex flex-col gap-8 sm:col-span-6 sm:col-start-6">
            {chapter.manifesto.map((p) => (
              <RevealItem key={p}>
                <p className="max-w-xl text-lead leading-snug">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="relative aspect-[3/4] w-full overflow-hidden sm:col-span-2 sm:col-start-11">
            <Image
              src={photoUrl(atmospherePhotos[3].id)}
              alt={atmospherePhotos[3].alt}
              fill
              sizes="(min-width: 640px) 16vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <Reveal className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]" as="div">
        <Image
          src={photoUrl(atmospherePhotos[4].id)}
          alt={atmospherePhotos[4].alt}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </Reveal>

      <div id="the-designs">
        <ThreeDesigns products={products} />
      </div>

      <section className="bg-paper px-5 py-24 text-paperink sm:px-8">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 sm:grid-cols-12">
          <div className="sm:col-span-8">
            <h2 className="text-head uppercase leading-[0.9]">One statement.</h2>
            <p className="mt-4 max-w-sm text-small uppercase tracking-wide text-paperink/70">
              {chapter.designCount} designs. {chapter.pieceCount} pieces. No artificial hype. Once they&rsquo;re
              gone, this chapter closes.
            </p>
          </div>
          <div className="relative aspect-square w-full overflow-hidden sm:col-span-3 sm:col-start-10">
            <Image
              src={photoUrl(atmospherePhotos[5].id)}
              alt={atmospherePhotos[5].alt}
              fill
              sizes="(min-width: 640px) 25vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 bg-surface px-5 py-24 text-center sm:px-8">
        <ArrowLink href="/chapters">Back to all chapters</ArrowLink>
      </section>
    </div>
  );
}
