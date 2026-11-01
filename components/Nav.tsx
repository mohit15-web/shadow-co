"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./CartDrawer";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/chapters", label: "Chapters" },
  { href: "/chapters/the-unheard", label: "The Unheard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-small uppercase tracking-wide">
          Shadow Co.
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCartOpen(true)}
            className="text-small uppercase tracking-wide"
            aria-label={`Open bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            Bag {itemCount > 0 && <span>({itemCount})</span>}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-small uppercase tracking-wide"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg px-5 py-5 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-small uppercase tracking-wide">Shadow Co.</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-small uppercase tracking-wide"
                autoFocus
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-head uppercase leading-none transition-opacity hover:opacity-70 ${
                        active ? "opacity-100" : "opacity-50"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <p className="max-w-xs text-small text-muted">
              We don&rsquo;t need to speak about everything. We choose what deserves to be said.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
