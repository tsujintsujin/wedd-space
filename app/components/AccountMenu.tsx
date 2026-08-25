"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from "@/app/components/auth/LogoutButton";
import type { User } from "@supabase/supabase-js";

export default function AccountMenu({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const email = user?.email ?? null;
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    null;
  const firstName = fullName?.split(" ")[0] ?? null;
  const displayName = firstName ? `Hi ${firstName}!` : email;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={email ?? undefined}
        className="focus-ring flex max-w-[220px] cursor-pointer items-center gap-2 border border-ink/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine"
      >
        <span className="truncate">{displayName ?? "My Wedd Space"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-10 mt-2 w-56 border border-ink/15 bg-cream shadow-[0_20px_40px_-20px_rgba(36,26,18,0.4)]"
          >
            {email && (
              <p className="truncate border-b border-ink/10 px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-faint" title={email}>
                {email}
              </p>
            )}
            <a
              href="/dashboard"
              role="menuitem"
              className="focus-ring block cursor-pointer px-4 py-2.5 text-right font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 hover:bg-surface hover:text-wine"
            >
              My Wedd Space
            </a>
            <LogoutButton className="focus-ring block w-full cursor-pointer px-4 py-2.5 text-right font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 hover:bg-surface hover:text-wine" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
