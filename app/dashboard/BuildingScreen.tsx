"use client";

import { motion } from "framer-motion";

export default function BuildingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-wine-deep px-6 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        className="h-14 w-14 rounded-full border-2 border-cream/25 border-t-cream"
      />
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 font-display text-3xl italic text-cream sm:text-4xl"
      >
        Building your site…
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60"
      >
        Just a moment
      </motion.p>
    </motion.div>
  );
}
