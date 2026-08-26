"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    title: "Your story",
    body: "Tell guests how it started, the proposal, and everything in between — laid out like a keepsake, not a form.",
  },
  {
    title: "RSVP, done right",
    body: "Guests confirm attendance, meal choice, and plus-ones in one tap. You get a live, exportable guest list.",
  },
  {
    title: "Schedule & venue",
    body: "Ceremony, reception, and every event in between — with maps, dress code, and timing guests can save.",
  },
  {
    title: "Photo gallery",
    body: "Share engagement shoots before the big day, then open a shared album for guests to upload their own.",
  },
  {
    title: "Registry, linked",
    body: "Point to any registry — or several — so gift-giving stays simple for guests near and far.",
  },
  {
    title: "One link to share",
    body: "wedd.space/yournames — clean, memorable, and mobile-first for the group chat and the invitation card alike.",
  },
];

export default function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.12)}
          className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.h2
              variants={fadeUp}
              className="max-w-lg font-display text-4xl italic leading-[1.02] text-ink md:text-6xl"
            >
              Everything the invitation couldn&apos;t hold.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-xs font-mono text-xs leading-relaxed text-faint md:text-right"
          >
            Six things every wedd.space page carries — from the first &ldquo;we&apos;re
            engaged&rdquo; post to the last thank-you card.
          </motion.p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.08)}
          className="border-y border-line"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group grid grid-cols-[3.5rem_1fr] items-start gap-4 border-b border-line py-8 last:border-b-0 sm:grid-cols-[6rem_1fr] sm:gap-8 md:grid-cols-[7rem_1fr_1fr] md:gap-10 md:py-10"
            >
              <span className="font-display text-4xl italic leading-none text-ink/10 transition-colors duration-300 group-hover:text-wine/30 sm:text-6xl md:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-start-2 font-display text-2xl italic leading-tight text-ink md:text-3xl">
                {f.title}
              </h3>
              <p className="col-start-2 font-body text-[15px] leading-relaxed text-muted md:col-start-3 md:max-w-md">
                {f.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
