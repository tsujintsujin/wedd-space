"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Showcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="showcase" className="relative bg-cream-deep py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer(0.12)}
            className="lg:order-1"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine"
            >
              Case study
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl italic leading-[1.02] text-ink md:text-5xl"
            >
              A real page, mid-build.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md font-body text-lg leading-relaxed text-muted"
            >
              This is Cambial &amp; partner&apos;s wedding site — one of our first
              builds, still in progress. It shows the tone we&apos;re going for:
              warm, editorial, and fast to load on a phone at a family gathering.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-2">
              <a
                href="https://cambial-wedding.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex w-fit cursor-pointer items-center gap-2 border-b-2 border-wine pb-1 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:text-wine"
              >
                View live example
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
              <span className="font-mono text-xs text-faint">
                cambial-wedding.vercel.app
              </span>
            </motion.div>
          </motion.div>

          <motion.a
            href="https://cambial-wedding.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group focus-ring relative block cursor-pointer lg:order-2"
            aria-label="Open the Cambial wedding website live example in a new tab"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-wine to-wine-deep shadow-[0_35px_70px_-30px_rgba(58,16,24,0.55)] transition-transform duration-300 group-hover:-translate-y-1"
              style={{
                clipPath:
                  "polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="font-display text-4xl italic leading-tight text-cream sm:text-5xl">
                  Cambial &amp; Partner
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-cream/60">
                  Live demo &mdash; click to open
                </span>
              </div>
            </div>
            <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
              Fig. 01 &mdash; Cambial &amp; Partner, in progress
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
