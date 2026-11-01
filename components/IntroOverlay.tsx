"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SEEN_KEY = "shadow-co-intro-seen";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

export function IntroOverlay() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    // Intro only makes sense once we know we're on the client (sessionStorage,
    // reduced-motion preference); there's no meaningful initial render to sync from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const t = setTimeout(() => dismiss(), 700);
    return () => clearTimeout(t);
  }, [reduce]);

  function dismiss() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ backgroundImage: GRAIN }}
            aria-hidden
          />
          <h1 className="font-display text-head uppercase">Shadow Co.</h1>
          <button
            onClick={dismiss}
            className="absolute bottom-10 text-small uppercase tracking-wide text-muted hover:text-ink"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
