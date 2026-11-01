"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, getProduct } from "@/lib/products";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { QuantitySelector } from "@/components/QuantitySelector";

export default function CartPage() {
  const { items, setQuantity, removeItem } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.productSlug);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <h1 className="text-head uppercase leading-[0.9]">Your bag</h1>
        </Reveal>

        {items.length === 0 ? (
          <RevealGroup className="mt-16">
            <RevealItem>
              <p className="text-lead text-muted">Your bag is empty.</p>
            </RevealItem>
            <RevealItem>
              <Link href="/chapters/the-unheard" className="mt-6 inline-block text-small uppercase tracking-wide hover:opacity-70">
                Enter Chapter 001 →
              </Link>
            </RevealItem>
          </RevealGroup>
        ) : (
          <>
            <ul className="mt-14 flex flex-col gap-2">
              {items.map((item) => {
                const product = getProduct(item.productSlug);
                if (!product) return null;
                return (
                  <li key={`${item.productSlug}-${item.size}`} className="flex gap-6 bg-surface p-6">
                    <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-surface-2">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-wrap items-start justify-between gap-4">
                      <div>
                        <code className="font-mono-label text-small text-muted">{product.code}</code>
                        <Link href={`/product/${product.slug}`} className="mt-1 block text-lead uppercase hover:opacity-70">
                          {product.workingTitle}
                        </Link>
                        <p className="mt-1 text-small text-muted">Size {item.size}</p>
                        <p className="mt-2 text-small">{formatPrice(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(n) => setQuantity(item.productSlug, item.size, n)}
                          label={`Quantity, ${product.workingTitle}, size ${item.size}`}
                        />
                        <button
                          onClick={() => removeItem(item.productSlug, item.size)}
                          className="text-small uppercase text-muted underline-offset-4 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col items-end gap-4 bg-surface px-6 py-8 sm:px-8">
              <div className="flex w-full max-w-xs items-center justify-between text-small uppercase tracking-wide">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <button
                onClick={() => setCheckoutMessage(true)}
                className="w-full max-w-xs bg-ink py-4 text-small uppercase tracking-wide text-bg transition-opacity hover:opacity-85"
              >
                Checkout
              </button>
              {checkoutMessage && (
                <p className="max-w-xs text-right text-small text-muted">
                  Checkout isn&rsquo;t connected yet — this is a working preview of the bag, not a live store.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
