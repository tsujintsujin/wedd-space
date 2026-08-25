"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, fadeUp, revealLine, staggerContainer } from "@/lib/motion";
import type { SiteConfig } from "../_lib/types";
import Countdown, { formatCountdownLabel, getDaysUntil } from "../_components/Countdown";
import EditablePhotoOverlay from "../_components/EditablePhotoOverlay";
import EditableText from "../_components/EditableText";
import LocationCard from "../_components/LocationCard";
import ColorMotifSwatches from "../_components/ColorMotifSwatches";
import RsvpList from "../_components/RsvpList";

// Hand-placed scrapbook slots: varied width, vertical drift, and negative
// margin (to overlap the previous photo) so the collage reads as scattered,
// not a uniform grid. Cycles if there are more photos than slots.
const MOMENT_SLOTS = [
  { width: "w-72 sm:w-80", rotate: -4, offsetY: 0, ml: "", z: 20 },
  { width: "w-48 sm:w-56", rotate: 7, offsetY: 70, ml: "-ml-8 sm:-ml-14", z: 30 },
  { width: "w-60 sm:w-72", rotate: -8, offsetY: -24, ml: "", z: 10 },
  { width: "w-80 sm:w-[22rem]", rotate: 3, offsetY: 32, ml: "", z: 10 },
  { width: "w-44 sm:w-52", rotate: -6, offsetY: -44, ml: "-ml-10 sm:-ml-16", z: 30 },
  { width: "w-64 sm:w-72", rotate: 5, offsetY: 14, ml: "", z: 20 },
  { width: "w-56 sm:w-64", rotate: -3, offsetY: -14, ml: "-ml-6 sm:-ml-10", z: 20 },
];

function formatDisplayDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EvergreenView({
  site,
  editable,
  onFieldChange,
  onUploadPhoto,
  uploadingSlot,
}: {
  site: SiteConfig;
  editable?: boolean;
  onFieldChange?: (updater: (c: SiteConfig) => SiteConfig) => void;
  onUploadPhoto?: (file: File, slotKey: string, folder: string, apply: (url: string) => void) => void;
  uploadingSlot?: string | null;
}) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? "visible" : "hidden";
  const reveal = shouldReduceMotion
    ? { initial: "visible" as const, whileInView: undefined, viewport: undefined }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.3 } };

  const {
    coupleNames,
    weddingDate,
    heroPhotos,
    story,
    weddingLocation,
    receptionLocation,
    colorMotif,
    dressCode,
    rsvps,
  } = site;

  const [dominant, ...restPhotos] = heroPhotos;
  const accent = colorMotif[0];
  const diffDays = getDaysUntil(weddingDate);
  const sealTop = diffDays !== null && diffDays >= 0 ? `${diffDays}` : "❤";
  const sealBottom = diffDays !== null && diffDays >= 0 ? "days to go" : diffDays !== null ? formatCountdownLabel(diffDays) : "";

  const handleUpload = (slotKey: string, folder: string, file: File, apply: (url: string) => void) => {
    onUploadPhoto?.(file, slotKey, folder, apply);
  };

  const setHeroPhotoUrl = (index: number, url: string) => {
    onFieldChange?.((c) => {
      const heroPhotos = [...c.heroPhotos];
      heroPhotos[index] = { ...heroPhotos[index], url };
      return { ...c, heroPhotos };
    });
  };

  const setStoryPhotoUrl = (index: number, url: string) => {
    onFieldChange?.((c) => {
      const nextStory = [...c.story];
      nextStory[index] = { ...nextStory[index], photo: { ...nextStory[index].photo, url } };
      return { ...c, story: nextStory };
    });
  };

  const updateStoryField = (index: number, field: "title" | "body", value: string) => {
    onFieldChange?.((c) => {
      const nextStory = [...c.story];
      nextStory[index] = { ...nextStory[index], [field]: value };
      return { ...c, story: nextStory };
    });
  };

  const updateCoupleName = (field: "partnerA" | "partnerB", value: string) => {
    onFieldChange?.((c) => ({ ...c, coupleNames: { ...c.coupleNames, [field]: value } }));
  };

  const setHeroPhotoPosition = (index: number, focalX: number, focalY: number, zoom: number) => {
    onFieldChange?.((c) => {
      const heroPhotos = [...c.heroPhotos];
      heroPhotos[index] = { ...heroPhotos[index], focalX, focalY, zoom };
      return { ...c, heroPhotos };
    });
  };

  const setStoryPhotoPosition = (index: number, focalX: number, focalY: number, zoom: number) => {
    onFieldChange?.((c) => {
      const nextStory = [...c.story];
      nextStory[index] = {
        ...nextStory[index],
        photo: { ...nextStory[index].photo, focalX, focalY, zoom },
      };
      return { ...c, story: nextStory };
    });
  };

  const updateLocationField = (
    key: "weddingLocation" | "receptionLocation",
    field: "label" | "address",
    value: string
  ) => {
    onFieldChange?.((c) => ({ ...c, [key]: { ...c[key], [field]: value } }));
  };

  return (
    <main className="bg-cream text-ink">
      {/* Hero — full-bleed dominant photo, names + date, overlapping countdown seal */}
      <section className="relative z-10 flex min-h-[92vh] items-end pb-24 md:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <EditablePhotoOverlay
            motif={colorMotif}
            index={0}
            url={dominant?.url}
            className="h-full w-full"
            editable={editable}
            uploading={uploadingSlot === "hero-0"}
            onUpload={(file) => handleUpload("hero-0", "hero", file, (url) => setHeroPhotoUrl(0, url))}
            focalX={dominant?.focalX}
            focalY={dominant?.focalY}
            zoom={dominant?.zoom}
            onPositionChange={(fx, fy, z) => setHeroPhotoPosition(0, fx, fy, z)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
          />
        </div>

        <motion.div
          initial={initial}
          animate="visible"
          variants={staggerContainer(0.16)}
          className="relative mx-auto w-full max-w-4xl px-6 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/75"
          >
            <span className="h-px w-8 bg-cream/50" />
            Together with their families
            <span className="h-px w-8 bg-cream/50" />
          </motion.div>

          <h1 className="font-display text-6xl italic leading-[0.98] text-cream sm:text-7xl md:text-8xl">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealLine}>
                <EditableText
                  value={coupleNames.partnerA}
                  editable={editable}
                  onCommit={(v) => updateCoupleName("partnerA", v)}
                  placeholder="Partner A"
                />
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealLine}>
                &amp;{" "}
                <EditableText
                  value={coupleNames.partnerB}
                  editable={editable}
                  onCommit={(v) => updateCoupleName("partnerB", v)}
                  placeholder="Partner B"
                />
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-7 font-body text-lg text-cream/90 md:text-xl">
            {formatDisplayDate(weddingDate)}
          </motion.p>
        </motion.div>

        {/* Countdown seal — overlaps the hero's bottom edge like a wax stamp */}
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, rotate: -8 } : { scale: 0.8, rotate: -14, opacity: 0 }}
          animate={{ scale: 1, rotate: -8, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_EDITORIAL, delay: 0.7 }}
          className="absolute -bottom-10 left-1/2 flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-wine text-center shadow-[0_20px_40px_-12px_rgba(36,26,18,0.5)] sm:h-28 sm:w-28"
        >
          <span className="font-display text-2xl italic leading-none text-cream sm:text-3xl">{sealTop}</span>
          <span className="mt-1 max-w-[70px] font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-cream/80 sm:text-[9px]">
            {sealBottom}
          </span>
        </motion.div>
      </section>

      {/* Moments — scattered polaroid gallery */}
      <section className="overflow-hidden bg-cream pb-16 pt-20 md:pb-20">
        <motion.div
          {...reveal}
          variants={staggerContainer(0.1)}
          className="mx-auto max-w-xl px-6 text-center"
        >
          <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
            Moments
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl italic text-ink md:text-5xl">
            A few of our favorites
          </motion.h2>
        </motion.div>

        <motion.div
          {...reveal}
          variants={staggerContainer(0.08, 0.1)}
          className="mx-auto mt-16 flex max-w-6xl flex-wrap items-start justify-center gap-x-3 gap-y-10 px-6 sm:gap-x-4"
        >
          {restPhotos.map((photo, i) => {
            const slot = MOMENT_SLOTS[i % MOMENT_SLOTS.length];
            const slotKey = `hero-${i + 1}`;
            return (
              <motion.div
                key={photo.id}
                variants={{
                  hidden: { y: 30, opacity: 0, rotate: slot.rotate * 0.5 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    rotate: slot.rotate,
                    transition: { duration: 0.7, ease: EASE_EDITORIAL },
                  },
                }}
                whileHover={shouldReduceMotion ? undefined : { rotate: 0, y: -8, scale: 1.04, zIndex: 50 }}
                style={{ marginTop: slot.offsetY, zIndex: slot.z }}
                className={`relative ${slot.width} ${slot.ml} cursor-default bg-surface p-3 pb-6 shadow-[0_25px_45px_-20px_rgba(36,26,18,0.4)] transition-shadow duration-200 hover:shadow-[0_30px_55px_-18px_rgba(36,26,18,0.5)]`}
              >
                <EditablePhotoOverlay
                  motif={colorMotif}
                  index={i + 1}
                  url={photo.url}
                  className="aspect-square w-full"
                  editable={editable}
                  uploading={uploadingSlot === slotKey}
                  onUpload={(file) =>
                    handleUpload(slotKey, "hero", file, (url) => setHeroPhotoUrl(i + 1, url))
                  }
                  focalX={photo.focalX}
                  focalY={photo.focalY}
                  zoom={photo.zoom}
                  onPositionChange={(fx, fy, z) => setHeroPhotoPosition(i + 1, fx, fy, z)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Our story — alternating sides, framed polaroid photos */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div {...reveal} variants={staggerContainer(0.1)} className="text-center">
            <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
              Our story
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl italic text-ink md:text-5xl">
              How we got here
            </motion.h2>
          </motion.div>

          <div className="mt-20 space-y-20 md:space-y-28">
            {story.map((block, i) => {
              const reversed = i % 2 === 1;
              const rotate = reversed ? 3 : -3;
              const slotKey = `story-${i}`;
              return (
                <motion.div
                  key={block.id}
                  {...reveal}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_EDITORIAL } },
                  }}
                >
                  <div
                    className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                      reversed ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div
                      className={`w-full max-w-[340px] bg-cream p-3 pb-8 shadow-[0_30px_55px_-25px_rgba(36,26,18,0.4)] ${reversed ? "md:ml-auto md:mr-4" : "md:mr-auto md:ml-4"}`}
                      style={{ transform: `rotate(${rotate}deg)` }}
                    >
                      <EditablePhotoOverlay
                        motif={colorMotif}
                        index={i + 10}
                        url={block.photo.url}
                        className="aspect-[4/3] w-full"
                        editable={editable}
                        uploading={uploadingSlot === slotKey}
                        onUpload={(file) =>
                          handleUpload(slotKey, "story", file, (url) => setStoryPhotoUrl(i, url))
                        }
                        focalX={block.photo.focalX}
                        focalY={block.photo.focalY}
                        zoom={block.photo.zoom}
                        onPositionChange={(fx, fy, z) => setStoryPhotoPosition(i, fx, fy, z)}
                      />
                    </div>
                    <div className={reversed ? "md:text-right" : ""}>
                      <span className="font-mono text-xs text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <EditableText
                        as="h3"
                        className="mt-2 font-display text-3xl italic text-ink"
                        value={block.title}
                        editable={editable}
                        onCommit={(v) => updateStoryField(i, "title", v)}
                        placeholder="Title"
                      />
                      <EditableText
                        as="p"
                        className="mt-4 font-body text-[15px] leading-relaxed text-muted"
                        value={block.body}
                        editable={editable}
                        multiline
                        onCommit={(v) => updateStoryField(i, "body", v)}
                        placeholder="Tell this part of the story…"
                      />
                    </div>
                  </div>
                  {i < story.length - 1 && (
                    <div className="mt-20 flex items-center justify-center gap-3 md:mt-28" aria-hidden="true">
                      <span className="h-px w-16 bg-ink/15" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-wine/60" />
                      <span className="h-px w-16 bg-ink/15" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Details — locations, motif, dress code */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div {...reveal} variants={staggerContainer(0.1)} className="text-center">
            <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
              Details
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl italic text-ink md:text-5xl">
              What you need to know
            </motion.h2>
          </motion.div>

          <motion.div
            {...reveal}
            variants={staggerContainer(0.12)}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <LocationCard
                kicker="Ceremony"
                location={weddingLocation}
                editable={editable}
                onFieldChange={(field, value) => updateLocationField("weddingLocation", field, value)}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <LocationCard
                kicker="Reception"
                location={receptionLocation}
                editable={editable}
                onFieldChange={(field, value) => updateLocationField("receptionLocation", field, value)}
              />
            </motion.div>
          </motion.div>

          <motion.div
            {...reveal}
            variants={staggerContainer(0.12)}
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="bg-surface p-8 shadow-[0_25px_50px_-30px_rgba(36,26,18,0.35)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-wine">Color motif</p>
              <div className="mt-4 border-t border-dashed border-ink/20" aria-hidden="true" />
              <div className="mt-5">
                <ColorMotifSwatches colors={colorMotif} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-surface p-8 shadow-[0_25px_50px_-30px_rgba(36,26,18,0.35)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-wine">Dress code</p>
              <div className="mt-4 border-t border-dashed border-ink/20" aria-hidden="true" />
              <EditableText
                as="p"
                className="mt-5 font-body text-[15px] leading-relaxed text-muted"
                value={dressCode}
                editable={editable}
                onCommit={(v) => onFieldChange?.((c) => ({ ...c, dressCode: v }))}
                placeholder="Casual, Formal, Beach…"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RSVP list */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div {...reveal} variants={staggerContainer(0.1)} className="text-center">
            <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
              RSVP
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl italic text-ink md:text-5xl">
              Who&rsquo;s coming
            </motion.h2>
          </motion.div>

          <motion.div
            {...reveal}
            variants={fadeUp}
            className="mt-14 bg-cream p-8 shadow-[0_30px_60px_-25px_rgba(36,26,18,0.35)] sm:p-10"
          >
            <RsvpList rsvps={rsvps} />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-10 text-center" style={{ backgroundColor: accent + "10" }}>
        <Countdown weddingDate={weddingDate} className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint" />
        <Link
          href="/"
          className="focus-ring mt-3 inline-block cursor-pointer font-mono text-[11px] uppercase tracking-[0.22em] text-faint transition-colors duration-200 hover:text-wine"
        >
          Made with wedd.space
        </Link>
      </footer>
    </main>
  );
}
