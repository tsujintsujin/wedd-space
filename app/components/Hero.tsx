"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, fadeUp, revealLine, staggerContainer } from "@/lib/motion";

const headlineLines = ["Save the date.", "Skip the"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? "visible" : "hidden";

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(560px_circle_at_12%_0%,rgba(126,36,54,0.10),transparent_60%),radial-gradient(480px_circle_at_92%_30%,rgba(126,36,54,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        {/* Left: copy */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={staggerContainer(0.16)}
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-wine"
          >
            <span className="h-px w-10 bg-wine/60" />
            No. 001 &mdash; wedd.space
          </motion.div>

          <h1 className="font-display text-[3.4rem] italic leading-[0.98] text-ink sm:text-7xl md:text-[5.5rem]">
            {headlineLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.span className="block" variants={revealLine}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealLine}>
                <span className="text-wine">group chat.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md font-body text-lg leading-relaxed text-muted md:text-xl"
          >
            wedd.space gathers your story, RSVPs, schedule, gallery, and registry
            onto one page guests will actually open &mdash; no app, no login,
            no reply-all.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#get-started"
              className="focus-ring w-full cursor-pointer bg-ink px-8 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine sm:w-auto"
            >
              Start your page
            </a>
            <a
              href="#showcase"
              className="focus-ring w-full cursor-pointer border border-ink/25 px-8 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine sm:w-auto"
            >
              View live example
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 font-mono text-xs text-faint">
            Free to start &middot; No card required
          </motion.p>
        </motion.div>

        {/* Right: overlapping invitation cards */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={staggerContainer(0.18, 0.3)}
          className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[440px] lg:mx-0 lg:h-[480px]"
        >
          {/* back card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24, rotate: -2 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: -6,
                transition: { duration: 0.8, ease: EASE_EDITORIAL },
              },
            }}
            className="absolute left-2 top-0 w-[78%] bg-cream-deep p-7 shadow-[0_30px_60px_-25px_rgba(36,26,18,0.35)] sm:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
              Together with their families
            </p>
            <p className="mt-6 font-display text-4xl italic leading-tight text-ink sm:text-5xl">
              Alexandra
              <br />
              &amp; Julian
            </p>
            <div className="mt-6 h-px w-16 bg-wine/40" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              June 14 &middot; wedd.space/a-and-j
            </p>
          </motion.div>

          {/* front card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24, rotate: 3 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: 4,
                transition: { duration: 0.8, ease: EASE_EDITORIAL },
              },
            }}
            className="absolute bottom-0 right-0 w-[62%] bg-surface p-6 shadow-[0_30px_60px_-20px_rgba(36,26,18,0.4)] sm:p-7"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-wine">
              R.S.V.P.
            </p>
            <p className="mt-4 font-display text-2xl italic text-ink sm:text-3xl">
              Attending
            </p>
            <p className="mt-1 font-mono text-xs text-muted">128 / 140 guests confirmed</p>
            <div className="mt-5 h-1.5 w-full bg-ink/10">
              <div className="h-1.5 w-[91%] bg-wine" />
            </div>
          </motion.div>

          {/* seal */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.6, rotate: -8 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: -12,
                transition: { duration: 0.6, ease: EASE_EDITORIAL, delay: 0.5 },
              },
            }}
            className="absolute -right-3 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-wine text-center shadow-lg sm:-right-5 sm:top-8 sm:h-20 sm:w-20"
          >
            <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.15em] text-cream sm:text-[10px]">
              Est.
              <br />
              2026
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
