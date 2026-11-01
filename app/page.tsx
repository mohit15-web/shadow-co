import { Hero } from "@/components/Hero";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ChapterFeature } from "@/components/ChapterFeature";
import { ThreeDesigns } from "@/components/ThreeDesigns";
import { LimitedRelease } from "@/components/LimitedRelease";
import { NextChapterTeaser } from "@/components/NextChapterTeaser";
import { chapters } from "@/lib/chapters";
import { getProductsByChapter } from "@/lib/products";

export default function HomePage() {
  const chapter = chapters[0];
  const products = getProductsByChapter(chapter.slug);

  return (
    <>
      <Hero />
      <PhilosophySection />
      <ChapterFeature chapter={chapter} />
      <ThreeDesigns products={products} />
      <LimitedRelease />
      <NextChapterTeaser />
    </>
  );
}
