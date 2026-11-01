"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";

const toneClass: Record<Product["panelTone"], string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
};

const VIEWS = ["Front", "Detail"] as const;

export function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = useState<(typeof VIEWS)[number]>("Front");
  const src = view === "Front" ? product.image : product.imageDetail;

  return (
    <div>
      <div
        className={`relative aspect-[4/5] overflow-hidden ${toneClass[product.panelTone]}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={src}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 640px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-4 left-4 text-small uppercase tracking-wide text-ink/80">
          Sample photography — pending final product shoot
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={`border px-4 py-2 text-small uppercase tracking-wide transition-colors ${
              view === v ? "border-ink text-ink" : "border-surface-2 text-muted hover:border-muted"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
