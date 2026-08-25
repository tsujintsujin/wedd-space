"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ChecklistItem } from "./_lib/validate";

function CheckItem({ item, delay }: { item: ChecklistItem; delay: number }) {
  return (
    <li className="flex items-center gap-3 py-1.5 font-body text-sm">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-ink/25 bg-cream">
        {item.done && (
          <motion.svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            fill="none"
            stroke="#7E2436"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M3 8.5l3.5 3.5L13 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </span>
      <span className={item.done ? "text-ink" : "text-faint"}>{item.label}</span>
    </li>
  );
}

export default function ConfirmPublishModal({
  items,
  onGoBack,
  onConfirm,
}: {
  items: ChecklistItem[];
  onGoBack: () => void;
  onConfirm: () => void;
}) {
  let doneIndex = -1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 px-4"
        onClick={onGoBack}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-publish-title"
          initial={{ scale: 0.96, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full max-w-md bg-surface p-8 shadow-[0_35px_70px_-30px_rgba(36,26,18,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
            Before you publish
          </p>
          <h3 id="confirm-publish-title" className="mt-3 font-display text-3xl italic text-ink">
            A few things look empty
          </h3>
          <p className="mt-2 font-body text-sm text-muted">
            Your site can go live like this — guests just won&apos;t see what&apos;s unchecked yet:
          </p>

          <ul className="mt-5 max-h-64 space-y-0.5 overflow-y-auto border-t border-dashed border-ink/20 pt-4">
            {items.map((item) => {
              if (item.done) doneIndex += 1;
              return <CheckItem key={item.label} item={item} delay={item.done ? doneIndex * 0.4 : 0} />;
            })}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onGoBack}
              className="focus-ring flex-1 cursor-pointer border border-ink/25 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="focus-ring flex-1 cursor-pointer bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine"
            >
              All good!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
