import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { formatPrice, type Product } from "@/lib/products";

const toneClass: Record<Product["panelTone"], string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
};

const layout = [
  "sm:col-span-7",
  "sm:col-span-5 sm:col-start-8 sm:mt-16",
  "sm:col-span-8 sm:col-start-3",
];

export function ThreeDesigns({ products }: { products: Product[] }) {
  return (
    <section className="bg-bg px-5 py-28 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="text-head uppercase leading-[0.9]">The three designs</h2>
        </Reveal>

        <div className="mt-16 grid gap-16 sm:grid-cols-12 sm:gap-x-8">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={0.08 * i} className={layout[i] ?? "sm:col-span-6"}>
              <Link href={`/product/${product.slug}`} className="group block">
                <div
                  className={`relative aspect-[4/5] overflow-hidden ${toneClass[product.panelTone]}`}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <code className="font-mono-label text-small text-muted">{product.code}</code>
                    <h3 className="mt-1 text-lead uppercase">{product.workingTitle}</h3>
                    <p className="mt-2 max-w-sm text-small text-muted">{product.garmentType}</p>
                  </div>
                  <p className="text-lead">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
