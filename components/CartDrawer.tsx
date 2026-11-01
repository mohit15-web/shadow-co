"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, getProduct } from "@/lib/products";
import { QuantitySelector } from "./QuantitySelector";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQuantity, removeItem } = useCart();

  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.productSlug);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-40 bg-bg/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping bag"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface p-6 sm:p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-small uppercase tracking-wide">Bag</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-small uppercase tracking-wide hover:opacity-60"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <p className="mt-16 text-small text-muted">Your bag is empty.</p>
            ) : (
              <ul className="mt-10 flex-1 space-y-6 overflow-y-auto">
                {items.map((item) => {
                  const product = getProduct(item.productSlug);
                  if (!product) return null;
                  return (
                    <li key={`${item.productSlug}-${item.size}`} className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-2">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <code className="font-mono-label text-small text-muted">{product.code}</code>
                        <div className="mt-1 flex items-baseline justify-between gap-2">
                          <p className="uppercase">{product.workingTitle}</p>
                          <p className="text-small">{formatPrice(product.price)}</p>
                        </div>
                        <p className="text-small text-muted">Size {item.size}</p>
                        <div className="mt-3 flex items-center gap-3">
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
            )}

            <div className="mt-8 bg-surface-2 p-6">
              <div className="flex items-center justify-between text-small uppercase tracking-wide">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/cart"
                onClick={onClose}
                className="mt-5 block w-full bg-ink py-4 text-center text-small uppercase tracking-wide text-bg transition-opacity hover:opacity-85"
              >
                View bag
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
