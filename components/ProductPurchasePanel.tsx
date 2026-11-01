"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, SIZE_RUN_NOTE, type Product } from "@/lib/products";
import { QuantitySelector } from "./QuantitySelector";
import { useToast } from "./Toast";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const toast = useToast();

  function handleAdd() {
    if (!size) return;
    addItem(product.slug, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    toast(`${product.workingTitle} added to your bag — size ${size}`);
  }

  return (
    <div>
      <p className="text-head leading-none">{formatPrice(product.price)}</p>

      <fieldset className="mt-10">
        <legend className="text-small uppercase tracking-wide text-muted">Size</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`h-12 w-12 border text-small uppercase transition-colors ${
                size === s
                  ? "border-ink bg-ink text-bg"
                  : "border-surface-2 text-ink hover:border-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-3 text-small text-muted">{SIZE_RUN_NOTE}</p>
      </fieldset>

      <div className="mt-8 flex items-center gap-4">
        <span className="text-small uppercase tracking-wide text-muted">Quantity</span>
        <QuantitySelector value={quantity} onChange={setQuantity} label="Quantity" />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!size}
        className="mt-10 w-full bg-ink py-4 text-small uppercase tracking-wide text-bg transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {added ? "Added to bag" : size ? "Add to bag" : "Select a size"}
      </button>

      <p className="mt-6 text-small text-muted">
        Edition of {product.editionSize}, part of {product.chapterSlug === "the-unheard" ? "18 pieces across Chapter 001" : "this chapter"}.
        Shipping and returns details will be confirmed before launch —{" "}
        <a href="/shipping" className="underline underline-offset-4">
          read the policy
        </a>
        .
      </p>
    </div>
  );
}
