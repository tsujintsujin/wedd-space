"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LoginButton from "@/app/components/auth/LoginButton";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "Showcase" },
  { href: "#pricing", label: "Pricing" },
];

export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setOffset = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.getBoundingClientRect().height}px`
      );
    };

    setOffset();
    const observer = new ResizeObserver(setOffset);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={shouldReduceMotion ? false : { y: -28 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="cursor-pointer font-display text-2xl italic text-ink">
          wedd<span className="text-wine not-italic">.space</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring inline-block cursor-pointer py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-wine"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LoginButton className="focus-ring hidden cursor-pointer font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-wine sm:inline-block" />
          <a
            href="#get-started"
            className="focus-ring cursor-pointer border border-ink/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine"
          >
            Get started
          </a>
        </div>
      </div>
    </motion.header>
  );
}
