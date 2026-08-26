"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { EASE_EDITORIAL, fadeUp, staggerContainer } from "@/lib/motion";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    delivery: "1-day delivery",
    description: "A clean digital invitation, ready fast.",
    features: [
      "1 wedding page at wedd.space/yournames",
      "Date, location, motif & your story",
      "Guest RSVP (attending, meal, plus-ones)",
      "Photo gallery (up to ~25 photos)",
      "Your site is live forever",
    ],
    cta: "Start free",
    preferred: false,
    rotate: -3,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49",
    period: "one-time",
    delivery: "3-day delivery",
    description: "Full logistics for the whole wedding.",
    features: [
      "Everything in Free",
      "Up to 4 pages",
      "A place for guests to leave a message",
      "RSVP export as PDF or CSV (PDF has a designed layout)",
      "Photo gallery (up to ~100 photos)",
      "With support",
    ],
    cta: "Get Premium",
    preferred: true,
    rotate: 0,
  },
  {
    id: "allout",
    name: "Full",
    price: "$99",
    period: "one-time",
    delivery: "7-day delivery",
    description: "Custom-designed, working directly with you.",
    features: [
      "Everything in Premium",
      "Personal consultation, not a template",
      "Design built around your actual motif",
      "Priority support",
    ],
    cta: "Get Full",
    preferred: false,
    rotate: 3,
  },
];

type Plan = (typeof plans)[number];

function PlanCard({ plan, className }: { plan: Plan; className?: string }) {
  return (
    <div className={`relative flex h-full flex-col bg-surface p-8 shadow-[0_35px_70px_-30px_rgba(36,26,18,0.4)] sm:p-9 ${className ?? ""}`}>
      {plan.preferred && (
        <span className="absolute -right-3 -top-3 flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-full bg-wine text-center shadow-lg">
          <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-cream">
            Pre-
            <br />
            ferred
          </span>
        </span>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-wine">{plan.delivery}</p>
      <h3 className="mt-3 font-display text-3xl italic text-ink">{plan.name}</h3>
      <p className="mt-1 font-body text-sm text-muted">{plan.description}</p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-5xl italic text-ink">{plan.price}</span>
        <span className="font-mono text-xs text-faint">/ {plan.period}</span>
      </div>

      <div className="mt-6 border-t border-dashed border-ink/20" aria-hidden="true" />

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 font-body text-[15px] text-muted">
            <span className="mt-1.5 font-mono text-xs text-wine" aria-hidden="true">
              &mdash;
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={`/?tier=${plan.id}#get-started`}
        className="focus-ring mt-8 block w-full cursor-pointer bg-ink px-6 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine"
      >
        {plan.cta}
      </a>
    </div>
  );
}

function MobilePlanSwitcher({ plans }: { plans: Plan[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const trackWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackWrapRef.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    setActive(Math.max(0, Math.min(plans.length - 1, index)));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = width * 0.2;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -500) {
      goTo(active + 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 500) {
      goTo(active - 1);
    }
  };

  return (
    <div className="mt-14 md:hidden">
      <div ref={trackWrapRef} className="w-full overflow-hidden">
        <motion.div
          className="flex touch-pan-y select-none"
          drag={width > 0 ? "x" : false}
          dragConstraints={{ left: -(plans.length - 1) * width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          animate={{ x: -active * width }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 38 }
          }
        >
          {plans.map((plan) => (
            <div key={plan.id} className="w-full shrink-0 px-2.5">
              <PlanCard plan={plan} className="h-full" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {plans.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            aria-label={`Show ${plan.name} plan`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`focus-ring h-2 w-2 cursor-pointer rounded-full transition-colors duration-200 ${
              i === active ? "bg-wine" : "bg-ink/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl italic leading-[1.02] text-ink md:text-5xl"
          >
            Simple pricing, no subscriptions.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 font-body text-lg text-muted">
            Pay once. Start from a real template, then we finish it with you &mdash;
            never a generic autofill.
          </motion.p>
        </motion.div>

        {/* Desktop: scattered 3-up grid */}
        <div className="mt-20 hidden md:grid md:grid-cols-3 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={
                shouldReduceMotion
                  ? { rotate: 0 }
                  : { y: 40, rotate: plan.rotate * 0.4 }
              }
              whileInView={{ y: 0, rotate: plan.rotate }}
              whileHover={shouldReduceMotion ? undefined : { rotate: 0, y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: i * 0.12 }}
            >
              <PlanCard plan={plan} className={plan.preferred ? "z-10 md:-mt-4 md:mb-4" : ""} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: one card at a time, swipeable and looping */}
        <MobilePlanSwitcher plans={plans} />

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Want your own domain instead of wedd.space/yourname? Ask us &mdash; pricing depends on the domain.
        </p>
      </div>
    </section>
  );
}
