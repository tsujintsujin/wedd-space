"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const GCASH_NUMBER = "09760994238";

export default function GCashModal({
  isOpen,
  onClose,
  amount,
  tierLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  tierLabel: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modalNode = modalRef.current;
    const focusableElements = modalNode
      ? Array.from(modalNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusableElements[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && focusableElements.length > 0) {
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(GCASH_NUMBER);
    toast.success("GCash number copied", { position: "bottom-right", autoClose: 3000 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 px-4"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gcash-modal-title"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-sm bg-surface p-8 shadow-[0_35px_70px_-30px_rgba(36,26,18,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
              Complete your order
            </p>
            <h3 id="gcash-modal-title" className="mt-3 font-display text-3xl italic text-ink">
              Pay via GCash
            </h3>
            <p className="mt-2 font-mono text-xs text-faint">{tierLabel}</p>

            <div className="mt-8 border border-dashed border-ink/20 p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Amount
              </p>
              <p className="mt-2 font-display text-4xl italic text-ink">
                &#8369;{amount}
              </p>
            </div>

            <div className="mt-6 bg-cream-deep p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                GCash number
              </p>
              <p className="mt-2 font-mono text-lg font-bold text-ink">{GCASH_NUMBER}</p>
              <button
                type="button"
                onClick={handleCopy}
                className="focus-ring mt-4 w-full cursor-pointer bg-wine px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine-deep"
              >
                Copy number
              </button>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Send the amount above, then reply to the confirmation email with your
              GCash reference number. We&apos;ll start on your page as soon as
              payment is confirmed.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="focus-ring mt-6 w-full cursor-pointer border border-ink/25 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
