"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import GCashModal from "./GCashModal";
import DatePicker from "./DatePicker";
import TierSelect from "./TierSelect";

const TIERS = [
  { id: "free", label: "Free — ₱0", amount: 0 },
  { id: "premium", label: "Premium — ₱499", amount: 499 },
  { id: "allout", label: "All Out — ₱799", amount: 799 },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [tier, setTier] = useState<(typeof TIERS)[number]["id"]>("premium");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [gcashOpen, setGcashOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("tier");
    if (requested && TIERS.some((t) => t.id === requested)) {
      setTier(requested as (typeof TIERS)[number]["id"]);
    }
  }, []);

  const selectedTier = TIERS.find((t) => t.id === tier)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, weddingDate, tier, message }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      if (selectedTier.amount > 0) {
        setGcashOpen(true);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="get-started" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.12)}
          className="relative bg-wine-deep px-8 py-16 md:px-16 md:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,#F5EAD8_0px,#F5EAD8_1px,transparent_1px,transparent_14px)]"
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
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
                Tell us about your day.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md font-body text-lg leading-relaxed text-cream/70"
              >
                Send the basics and we&apos;ll reach out to talk through the
                details &mdash; this starts a conversation, not an automated build.
              </motion.p>
            </div>

            {status === "success" ? (
              <motion.div variants={fadeUp} className="border border-cream/20 bg-cream/5 p-8">
                <p className="font-display text-2xl italic text-cream">
                  Got it &mdash; thank you.
                </p>
                <p className="mt-3 font-body text-cream/70">
                  {selectedTier.amount > 0
                    ? "Check the payment window for GCash details. We'll confirm by email once we've received it."
                    : "We'll be in touch by email shortly to get started."}
                </p>
              </motion.div>
            ) : (
              <motion.form variants={fadeUp} onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">
                      Your name(s)
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexandra & Julian"
                      className="focus-ring-dark mt-2 w-full border-b-2 border-cream/30 bg-transparent pb-2.5 font-body text-lg text-cream placeholder:text-cream/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="focus-ring-dark mt-2 w-full border-b-2 border-cream/30 bg-transparent pb-2.5 font-body text-lg text-cream placeholder:text-cream/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="weddingDate" className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">
                      Wedding date
                    </label>
                    <DatePicker id="weddingDate" value={weddingDate} onChange={setWeddingDate} />
                  </div>
                  <div>
                    <label htmlFor="tier" className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">
                      Package
                    </label>
                    <TierSelect
                      id="tier"
                      options={TIERS}
                      value={tier}
                      onChange={(id) => setTier(id as typeof tier)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">
                    Anything we should know? (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Venue, motif, guest count, anything at all"
                    className="focus-ring-dark mt-2 w-full resize-none border-b-2 border-cream/30 bg-transparent pb-2.5 font-body text-base text-cream placeholder:text-cream/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="focus-ring-dark w-full cursor-pointer bg-cream px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-wine-deep transition-colors duration-200 hover:bg-cream/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? "Sending…" : "Send inquiry"}
                </button>

                {status === "error" && (
                  <p className="font-mono text-xs text-cream/80">
                    Something went wrong &mdash; please try again in a moment.
                  </p>
                )}
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>

      <GCashModal
        isOpen={gcashOpen}
        onClose={() => setGcashOpen(false)}
        amount={selectedTier.amount}
        tierLabel={selectedTier.label}
      />
    </section>
  );
}
