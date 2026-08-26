"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { templates, type Template } from "@/lib/templates";
import TemplatePreviewModal from "./TemplatePreviewModal";

const photoFilters = [
  { value: "all", label: "All", test: () => true },
  { value: "1-5", label: "1 – 5", test: (n: number) => n >= 1 && n <= 5 },
  { value: "6-10", label: "6 – 10", test: (n: number) => n >= 6 && n <= 10 },
  { value: "11+", label: "11+", test: (n: number) => n >= 11 },
];

export default function TemplatesGrid() {
  const [filter, setFilter] = useState("all");
  const [openTemplate, setOpenTemplate] = useState<Template | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const visible = useMemo(() => {
    const active = photoFilters.find((f) => f.value === filter) ?? photoFilters[0];
    return templates.filter((t) => active.test(t.photos));
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-6 border-b border-line pb-8">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            # of Photos
          </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="focus-ring cursor-pointer border border-ink/25 bg-cream px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink"
          >
            {photoFilters.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label === "All" ? "All" : `${f.label} photos`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <motion.div
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={staggerContainer(0.08)}
        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((t) => (
          <motion.div key={t.slug} variants={fadeUp}>
            <button
              type="button"
              onClick={() => setOpenTemplate(t)}
              className="focus-ring group relative block aspect-[1.988] w-full cursor-pointer overflow-hidden border border-line"
              aria-label={`Preview the ${t.name} template`}
            >
              <Image
                src={t.thumbnail}
                alt={`${t.name} template preview`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition-colors duration-200 group-hover:ring-wine/40" />
            </button>

            <button
              type="button"
              onClick={() => setOpenTemplate(t)}
              className="focus-ring mt-4 block w-full cursor-pointer text-left"
            >
              <p className="font-display text-xl italic text-ink">{t.name}</p>
              <div className="mt-1 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                <span>{t.photos} photos</span>
                <span aria-hidden="true">&middot;</span>
                <span>{t.views.toLocaleString()} views</span>
                <span aria-hidden="true">&middot;</span>
                <span>{t.likes} likes</span>
              </div>
            </button>
          </motion.div>
        ))}

        {visible.length === 0 && (
          <p className="col-span-full font-mono text-sm text-muted">
            No templates match that filter yet.
          </p>
        )}
      </motion.div>

      <TemplatePreviewModal template={openTemplate} onClose={() => setOpenTemplate(null)} />
    </div>
  );
}
