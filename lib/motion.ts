import type { Variants } from "framer-motion";

export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EDITORIAL },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const revealLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};
