"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Template } from "@/lib/templates";

export default function TemplatePreviewModal({
  template,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!template) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Block scroll on the page behind the modal without touching `overflow`
    // on the body, so the page's own scrollbar never disappears or shifts
    // layout — only the scroll gesture itself is intercepted.
    const blockBackgroundScroll = (e: Event) => {
      if (scrollAreaRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("wheel", blockBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", blockBackgroundScroll, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("wheel", blockBackgroundScroll);
      document.removeEventListener("touchmove", blockBackgroundScroll);
    };
  }, [template, onClose]);

  return (
    <AnimatePresence>
      {template && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-6 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${template.name} preview`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[80vh] w-[80vw] min-w-[300px] max-w-6xl flex-col items-center gap-4"
          >
            <Link
              href={`/examples/${template.slug}`}
              className="focus-ring shrink-0 cursor-pointer rounded-full bg-ink px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_20px_40px_-15px_rgba(36,26,18,0.6)] transition-colors duration-200 hover:bg-wine"
            >
              Use this template
            </Link>

            <div
              ref={scrollAreaRef}
              className="no-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden rounded-2xl bg-cream-deep shadow-[0_50px_120px_-30px_rgba(36,26,18,0.6)]"
            >
              <Image
                src={template.preview}
                alt={`${template.name} full page preview`}
                width={template.previewWidth}
                height={template.previewHeight}
                sizes="80vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
