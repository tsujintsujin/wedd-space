"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const MotionLink = motion(Link);

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
              Live templates
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl italic leading-[1.02] text-ink md:text-5xl"
            >
              Real pages. Not placeholders.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md font-body text-lg leading-relaxed text-muted"
            >
              Bella in Love, Marry Monday, Ashley &amp; Jeff &mdash; three finished
              wedd.space pages, built the way we&apos;d build yours. Warm, editorial,
              and fast to load on a phone at a family gathering.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-2">
              <Link
                href="/templates"
                className="focus-ring inline-flex w-fit cursor-pointer items-center gap-2 border-b-2 border-wine pb-1 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink transition-[color,transform] duration-200 hover:text-wine active:scale-[0.97]"
              >
                View All Samples
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
              </Link>
              <span className="font-mono text-xs text-faint">
                wedd.space/templates
              </span>
            </motion.div>
          </motion.div>

          <MotionLink
            href="/examples/becky-richard"
            initial={shouldReduceMotion ? {} : { y: 30 }}
            whileInView={{ y: 0 }}
            whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: "easeOut" } }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group focus-ring relative block cursor-pointer lg:order-2"
            aria-label="Open the Bella in Love live template"
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
                  Bella in Love
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-cream/60">
                  Live template &mdash; click to open
                </span>
              </div>
            </div>
            <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
              Marry Monday and Ashley &amp; Jeff are live too
            </span>
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
