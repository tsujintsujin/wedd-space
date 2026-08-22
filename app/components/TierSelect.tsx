"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type TierOption = { id: string; label: string; amount: number };

export default function TierSelect({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: readonly TierOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      options.findIndex((o) => o.id === value),
      0,
    ),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selected = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.id === value);
      setActiveIndex(idx === -1 ? 0 : idx);
      requestAnimationFrame(() => listRef.current?.focus());
    }
  }, [open, options, value]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const commit = (idx: number) => {
    const opt = options[idx];
    if (opt) onChange(opt.id);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        className="focus-ring-dark mt-2 flex w-full items-center justify-between border-b-2 border-cream/30 bg-transparent pb-2.5 text-left font-body text-lg text-cream"
      >
        <span>{selected.label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-cream/50 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${id}-option-${activeIndex}`}
            onKeyDown={handleListKeyDown}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="focus-ring-dark absolute left-0 top-full z-20 mt-2 w-full border border-cream/20 bg-wine-deep py-1 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)]"
          >
            {options.map((opt, i) => (
              <li
                key={opt.id}
                id={`${id}-option-${i}`}
                ref={(node) => {
                  optionRefs.current[i] = node;
                }}
                role="option"
                aria-selected={opt.id === value}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(i)}
                className={`cursor-pointer px-4 py-2.5 font-mono text-sm transition-colors duration-100 ${
                  i === activeIndex ? "bg-cream/15 text-cream" : "text-cream/80"
                } ${opt.id === value ? "font-semibold" : ""}`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
