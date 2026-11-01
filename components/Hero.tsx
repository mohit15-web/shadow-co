"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { atmospherePhotos, photoUrl } from "@/lib/images";

const HERO_PHOTOS = [atmospherePhotos[0], atmospherePhotos[2], atmospherePhotos[4]];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Each photo arrives through an expanding circular reveal centered on the
  // title — like a film iris opening — then closes to black before the next
  // one opens. A deliberate cinematic beat rather than a dissolve.
  function useCircleClip(stops: number[], radii: number[]) {
    return useTransform(scrollYProgress, stops, radii.map((r) => `circle(${r}% at 50% 50%)`));
  }

  const clip0 = useCircleClip([0, 0.04, 0.28, 0.34], [78, 78, 78, 0]);
  const clip1 = useCircleClip([0.38, 0.44, 0.62, 0.68], [0, 78, 78, 0]);
  const clip2 = useCircleClip([0.72, 0.8, 1], [0, 78, 78]);
  const clips = [clip0, clip1, clip2];

  const scale0 = useTransform(scrollYProgress, [0, 0.34], [1, 1.08]);
  const scale1 = useTransform(scrollYProgress, [0.38, 0.68], [1, 1.08]);
  const scale2 = useTransform(scrollYProgress, [0.72, 1], [1, 1.1]);
  const scales = [scale0, scale1, scale2];

  return (
    <section ref={ref} className="relative" style={{ height: reduce ? "100svh" : "260svh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg">
        {HERO_PHOTOS.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="absolute inset-0"
            style={reduce ? { opacity: i === 0 ? 1 : 0 } : { clipPath: clips[i] }}
          >
            <motion.div
              className="absolute inset-0"
              style={reduce ? undefined : { scale: scales[i] }}
            >
              <Image
                src={photoUrl(photo.id)}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-bg/55" />

        <div className="relative flex h-full flex-col justify-between px-5 py-24 sm:px-8 sm:py-28">
          <div className="flex items-start justify-between text-small uppercase tracking-wide">
            <span>Drop 001</span>
            <span>The Unheard</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <h1
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Shadow Co.
            </h1>
            <p className="mt-6 max-w-xl text-lead uppercase leading-tight">
              We don&rsquo;t need to speak about everything.
              <br />
              We choose what deserves to be said.
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <p className="max-w-xs text-small uppercase tracking-wide text-ink/80">
              Three designs. Eighteen pieces. One statement.
            </p>
            <Link
              href="/chapters/the-unheard"
              className="border border-ink px-7 py-4 text-small uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Explore the first chapter →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
