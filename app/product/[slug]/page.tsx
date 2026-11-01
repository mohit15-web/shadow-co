import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { DETAILS_PENDING, formatPrice, getProduct, products } from "@/lib/products";
import { getChapter } from "@/lib/chapters";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.workingTitle, description: product.theIdea };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const chapter = getChapter(product.chapterSlug);
  const related = products.filter((p) => p.chapterSlug === product.chapterSlug && p.slug !== product.slug);

  return (
    <div className="px-5 pt-28 pb-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-3xl">
          <h1 className="text-head uppercase leading-[0.92]">{product.workingTitle}</h1>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-small uppercase tracking-wide text-muted">
            <code className="font-mono-label">{product.code}</code>
            <span>{product.garmentType} · working title, pending approval</span>
            {chapter && (
              <Link href={`/chapters/${chapter.slug}`} className="hover:text-ink">
                Chapter {chapter.number} — {chapter.title}
              </Link>
            )}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:grid-cols-12 sm:gap-16">
          <Reveal className="sm:col-span-7">
            <ProductGallery product={product} />
          </Reveal>

          <Reveal delay={0.08} className="sm:col-span-4 sm:col-start-9">
            <ProductPurchasePanel product={product} />
          </Reveal>
        </div>

        <div className="mt-28 grid gap-12 bg-surface px-6 py-16 sm:grid-cols-3 sm:gap-8 sm:px-10">
          <Reveal>
            <h2 className="text-small uppercase tracking-wide text-muted">The idea</h2>
            <p className="mt-4 text-lead leading-snug">{product.theIdea}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-small uppercase tracking-wide text-muted">The meaning</h2>
            <p className="mt-4 text-lead leading-snug">{product.theMeaning}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-small uppercase tracking-wide text-muted">The details</h2>
            <p className="mt-4 text-body leading-snug text-muted">{DETAILS_PENDING}</p>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <Reveal>
              <h2 className="text-small uppercase tracking-wide text-muted">Also in this chapter</h2>
            </Reveal>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={0.06 * i}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="text-lead uppercase">{p.workingTitle}</h3>
                      <span className="text-small">{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
