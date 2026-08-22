"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="get-started" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.12)}
          className="relative overflow-hidden bg-wine-deep px-8 py-16 md:px-16 md:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,#F5EAD8_0px,#F5EAD8_1px,transparent_1px,transparent_14px)]"
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/60"
              >
                No. 002 &mdash; Get started
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-display text-4xl italic leading-[1.02] text-cream md:text-5xl"
              >
                Send the invitations.
                <br />
                We&apos;ll handle the rest.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md font-body text-lg leading-relaxed text-cream/70"
              >
                Build your wedding website today &mdash; it takes less time than
                picking a font for the invitations.
              </motion.p>
            </div>

            <motion.form variants={fadeUp} className="w-full">
              <label
                htmlFor="email"
                className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60"
              >
                Your email
              </label>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="focus-ring-dark w-full border-b-2 border-cream/30 bg-transparent pb-3 font-display text-2xl italic text-cream placeholder:text-cream/30"
                />
                <button
                  type="submit"
                  className="focus-ring-dark w-full shrink-0 cursor-pointer bg-cream px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-wine-deep transition-colors duration-200 hover:bg-cream/85 sm:w-auto"
                >
                  Reserve link
                </button>
              </div>
              <p className="mt-4 font-mono text-xs text-cream/50">
                Free to start &middot; No card, no clutter
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
