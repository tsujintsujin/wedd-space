"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, fadeUp, staggerContainer } from "@/lib/motion";

const plans = [
  {
    name: "Free",
    price: "₱0",
    period: "forever",
    description: "Everything you need to get a page live today.",
    features: [
      "1 wedding page",
      "RSVP tracking",
      "Photo gallery (50 photos)",
      "wedd.space/yournames link",
    ],
    cta: "Start free",
    preferred: false,
    rotate: -4,
    hoverRotate: -1,
  },
  {
    name: "Premium",
    price: "₱799",
    period: "one-time",
    description: "For the couple who wants every detail covered.",
    features: [
      "Everything in Free",
      "Custom domain support",
      "Unlimited photos & guest uploads",
      "Multiple events & itineraries",
      "Guest list export (CSV)",
      "Priority support",
    ],
    cta: "Get Premium",
    preferred: true,
    rotate: 3,
    hoverRotate: 0,
  },
];

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative bg-cream pb-24 pt-16 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer(0.12)}
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl italic leading-[1.02] text-ink md:text-5xl"
          >
            Simple pricing, no subscriptions.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 font-body text-lg text-muted">
            Pay once if you need more. No monthly fees for a website you&apos;ll
            use for one season.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto mt-20 flex max-w-3xl flex-col gap-16 py-10 md:h-[620px] md:gap-0 md:py-0">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={
                shouldReduceMotion
                  ? { rotate: plan.rotate }
                  : { y: 40, rotate: plan.rotate * 0.4 }
              }
              whileInView={{ y: 0, rotate: plan.rotate }}
              whileHover={shouldReduceMotion ? undefined : { rotate: plan.hoverRotate, y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: i * 0.15 }}
              className={`relative w-full max-w-md bg-surface p-8 shadow-[0_35px_70px_-30px_rgba(36,26,18,0.4)] sm:p-10 md:absolute md:w-[420px] ${
                plan.preferred
                  ? "z-20 md:left-[38%] md:top-24"
                  : "z-10 md:left-[4%] md:top-0"
              }`}
            >
              {plan.preferred && (
                <span className="absolute -right-4 -top-4 flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-full bg-wine text-center shadow-lg sm:h-20 sm:w-20">
                  <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-cream sm:text-[10px]">
                    Pre-
                    <br />
                    ferred
                  </span>
                </span>
              )}

              <h3 className="font-display text-3xl italic text-ink">{plan.name}</h3>
              <p className="mt-1 font-body text-sm text-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-5xl italic text-ink">{plan.price}</span>
                <span className="font-mono text-xs text-faint">/ {plan.period}</span>
              </div>

              <div
                className="mt-6 border-t border-dashed border-ink/20"
                aria-hidden="true"
              />

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 font-body text-[15px] text-muted"
                  >
                    <span className="mt-1.5 font-mono text-xs text-wine" aria-hidden="true">
                      &mdash;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#get-started"
                className="focus-ring mt-8 block w-full cursor-pointer bg-ink px-6 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine"
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
