"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import EvergreenView from "@/app/templates/evergreen/EvergreenView";
import type { SiteConfig, StoryBlock } from "@/app/templates/_lib/types";
import { autoGrowTextarea } from "@/app/templates/_lib/autoGrow";
import { getChecklist } from "./_lib/validate";
import ConfirmPublishModal from "./ConfirmPublishModal";
import BuildingScreen from "./BuildingScreen";

const LocationMapPicker = dynamic(() => import("./LocationMapPicker"), {
  ssr: false,
  loading: () => <div className="h-48 w-full animate-pulse bg-surface" />,
});

async function uploadPhoto(file: File, folder: string): Promise<string> {
  const signRes = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });
  if (!signRes.ok) throw new Error("Could not get an upload signature");
  const { signature, timestamp, apiKey, cloudName, folder: scopedFolder } = await signRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", scopedFolder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
  const data = await uploadRes.json();
  return data.secure_url as string;
}

function PhotoUploadCell({
  label,
  url,
  uploading,
  onUpload,
}: {
  label: string;
  url?: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-ink/15 bg-surface">
      {url ? (
        <Image src={url} alt="" fill sizes="200px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          {label}
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="focus-ring absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/0 font-mono text-[10px] uppercase tracking-[0.14em] text-transparent transition-colors duration-150 hover:bg-ink/55 hover:text-cream disabled:cursor-wait"
      >
        {uploading ? "Uploading…" : url ? "Change photo" : "Upload photo"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

const fieldClass =
  "focus-ring mt-1.5 w-full border border-ink/15 bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-faint";
const labelClass = "font-mono text-[10px] uppercase tracking-[0.2em] text-muted";

export default function SiteEditor({ initialConfig }: { initialConfig: SiteConfig }) {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pendingChecklist, setPendingChecklist] = useState<ReturnType<typeof getChecklist> | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleUpload = async (slotKey: string, folder: string, file: File, apply: (url: string) => void) => {
    setUploadingSlot(slotKey);
    try {
      const url = await uploadPhoto(file, folder);
      apply(url);
    } catch (err) {
      console.error(err);
      alert("Photo upload failed — please try again.");
    } finally {
      setUploadingSlot(null);
    }
  };

  const publish = async () => {
    setPublishing(true);
    setSaveStatus("saving");
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1400));

    try {
      const [res] = await Promise.all([
        fetch("/api/site", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        }),
        minDelay,
      ]);
      if (!res.ok) throw new Error("Save failed");
      const { slug } = await res.json();
      router.push(`/${slug}`);
    } catch (err) {
      console.error(err);
      setPublishing(false);
      setSaveStatus("error");
    }
  };

  const handleSaveClick = () => {
    setSaveStatus("idle");
    const checklist = getChecklist(config);
    if (checklist.some((item) => !item.done)) {
      setPendingChecklist(checklist);
      return;
    }
    publish();
  };

  const setHeroPhotoUrl = (index: number, url: string) => {
    setConfig((c) => {
      const heroPhotos = [...c.heroPhotos];
      heroPhotos[index] = { ...heroPhotos[index], url };
      return { ...c, heroPhotos };
    });
  };

  const setStoryPhotoUrl = (index: number, url: string) => {
    setConfig((c) => {
      const story = [...c.story];
      story[index] = { ...story[index], photo: { ...story[index].photo, url } };
      return { ...c, story };
    });
  };

  const updateStoryField = (index: number, field: "title" | "body", value: string) => {
    setConfig((c) => {
      const story = [...c.story];
      story[index] = { ...story[index], [field]: value };
      return { ...c, story };
    });
  };

  const addStoryBlock = () => {
    setConfig((c) => {
      if (c.story.length >= 5) return c;
      const id = crypto.randomUUID();
      const newBlock: StoryBlock = { id: `story-${id}`, title: "", body: "", photo: { id: `story-photo-${id}` } };
      return { ...c, story: [...c.story, newBlock] };
    });
  };

  const removeStoryBlock = (index: number) => {
    setConfig((c) =>
      c.story.length <= 1 ? c : { ...c, story: c.story.filter((_, i) => i !== index) }
    );
  };

  const updateLocation = (
    key: "weddingLocation" | "receptionLocation",
    field: "label" | "address",
    value: string
  ) => {
    setConfig((c) => ({ ...c, [key]: { ...c[key], [field]: value } }));
  };

  const setLocationLatLng = (key: "weddingLocation" | "receptionLocation", lat: number, lng: number) => {
    setConfig((c) => ({ ...c, [key]: { ...c[key], lat, lng } }));
  };

  const updateMotifColor = (index: number, value: string) => {
    setConfig((c) => {
      const colorMotif = [...c.colorMotif];
      colorMotif[index] = value;
      return { ...c, colorMotif };
    });
  };

  const lastColorInputRef = useRef<HTMLInputElement>(null);
  const [justAddedColor, setJustAddedColor] = useState(false);

  useEffect(() => {
    if (justAddedColor && lastColorInputRef.current) {
      lastColorInputRef.current.click();
      setJustAddedColor(false);
    }
  }, [justAddedColor]);

  const addMotifColor = () => {
    if (config.colorMotif.length >= 6) return;
    setConfig((c) => ({ ...c, colorMotif: [...c.colorMotif, "#7E2436"] }));
    setJustAddedColor(true);
  };

  const removeMotifColor = (index: number) => {
    setConfig((c) =>
      c.colorMotif.length <= 2 ? c : { ...c, colorMotif: c.colorMotif.filter((_, i) => i !== index) }
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink lg:flex-row">
      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          aria-label="Show editor panel"
          className="focus-ring fixed left-4 top-4 z-30 flex h-10 w-10 cursor-pointer items-center justify-center border border-ink/15 bg-cream shadow-[0_10px_25px_-10px_rgba(36,26,18,0.4)] transition-colors duration-150 hover:border-wine hover:text-wine"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Left — form */}
      {panelOpen && (
        <div className="w-full overflow-y-auto border-ink/10 lg:h-screen lg:w-[440px] lg:border-r xl:w-[500px]">
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
            <Link
              href="/"
              className="focus-ring font-display text-2xl italic text-ink transition-opacity duration-150 hover:opacity-70"
            >
              wedd<span className="text-wine not-italic">.space</span>
            </Link>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="focus-ring cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors duration-200 hover:text-wine"
            >
              Hide
            </button>
          </div>

        <div className="space-y-10 px-6 py-8">
          {/* Couple + date */}
          <section>
            <p className={labelClass}>Couple</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                className={fieldClass}
                value={config.coupleNames.partnerA}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, coupleNames: { ...c.coupleNames, partnerA: e.target.value } }))
                }
                placeholder="Partner A"
              />
              <input
                className={fieldClass}
                value={config.coupleNames.partnerB}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, coupleNames: { ...c.coupleNames, partnerB: e.target.value } }))
                }
                placeholder="Partner B"
              />
            </div>
            <label className={`${labelClass} mt-4 block`}>
              Wedding date
              <input
                type="date"
                className={fieldClass}
                value={config.weddingDate}
                onChange={(e) => setConfig((c) => ({ ...c, weddingDate: e.target.value }))}
              />
            </label>
          </section>

          {/* Hero photos */}
          <section>
            <p className={labelClass}>Photos ({config.heroPhotos.length})</p>
            <p className="mt-1 font-body text-xs text-faint">First photo is the hero background.</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {config.heroPhotos.map((photo, i) => (
                <PhotoUploadCell
                  key={photo.id}
                  label={i === 0 ? "Hero" : `Photo ${i + 1}`}
                  url={photo.url}
                  uploading={uploadingSlot === `hero-${i}`}
                  onUpload={(file) => handleUpload(`hero-${i}`, "hero", file, (url) => setHeroPhotoUrl(i, url))}
                />
              ))}
            </div>
          </section>

          {/* Our story */}
          <section>
            <p className={labelClass}>Our story ({config.story.length}/5)</p>
            <div className="mt-3 space-y-6">
              {config.story.map((block, i) => (
                <div key={block.id} className="relative border border-ink/10 p-4">
                  {config.story.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStoryBlock(i)}
                      aria-label="Remove this story panel"
                      className="focus-ring absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-ink text-[10px] leading-none text-cream"
                    >
                      ×
                    </button>
                  )}
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0">
                      <PhotoUploadCell
                        label="Photo"
                        url={block.photo.url}
                        uploading={uploadingSlot === `story-${i}`}
                        onUpload={(file) =>
                          handleUpload(`story-${i}`, "story", file, (url) => setStoryPhotoUrl(i, url))
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block">
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">Title</span>
                        <input
                          className={fieldClass}
                          value={block.title}
                          onChange={(e) => updateStoryField(i, "title", e.target.value)}
                          placeholder="Title"
                        />
                      </label>
                      <textarea
                        ref={autoGrowTextarea}
                        className={`${fieldClass} resize-none overflow-hidden`}
                        rows={3}
                        value={block.body}
                        onChange={(e) => {
                          updateStoryField(i, "body", e.target.value);
                          autoGrowTextarea(e.target);
                        }}
                        placeholder="Tell this part of the story…"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {config.story.length < 5 && (
                <button
                  type="button"
                  onClick={addStoryBlock}
                  className="focus-ring flex w-full cursor-pointer items-center justify-center gap-2 border border-dashed border-ink/25 py-3 font-mono text-xs uppercase tracking-[0.18em] text-faint transition-colors duration-150 hover:border-wine hover:text-wine"
                >
                  + Add panel
                </button>
              )}
            </div>
          </section>

          {/* Locations */}
          <section>
            <p className={labelClass}>Ceremony location</p>
            <div className="mt-3 space-y-2">
              <input
                className={fieldClass}
                value={config.weddingLocation.label}
                onChange={(e) => updateLocation("weddingLocation", "label", e.target.value)}
                placeholder="Venue name"
              />
              <input
                className={fieldClass}
                value={config.weddingLocation.address}
                onChange={(e) => updateLocation("weddingLocation", "address", e.target.value)}
                placeholder="Address"
              />
              <p className="font-body text-xs text-faint">Click the map, or drag the pin, to set the spot.</p>
              <LocationMapPicker
                lat={config.weddingLocation.lat}
                lng={config.weddingLocation.lng}
                onChange={(lat, lng) => setLocationLatLng("weddingLocation", lat, lng)}
              />
            </div>
          </section>

          <section>
            <p className={labelClass}>Reception location</p>
            <div className="mt-3 space-y-2">
              <input
                className={fieldClass}
                value={config.receptionLocation.label}
                onChange={(e) => updateLocation("receptionLocation", "label", e.target.value)}
                placeholder="Venue name"
              />
              <input
                className={fieldClass}
                value={config.receptionLocation.address}
                onChange={(e) => updateLocation("receptionLocation", "address", e.target.value)}
                placeholder="Address"
              />
              <p className="font-body text-xs text-faint">Click the map, or drag the pin, to set the spot.</p>
              <LocationMapPicker
                lat={config.receptionLocation.lat}
                lng={config.receptionLocation.lng}
                onChange={(lat, lng) => setLocationLatLng("receptionLocation", lat, lng)}
              />
            </div>
          </section>

          {/* Color motif */}
          <section>
            <p className={labelClass}>Color motif ({config.colorMotif.length}/6)</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {config.colorMotif.map((color, i) => (
                <div key={i} className="relative">
                  <input
                    ref={i === config.colorMotif.length - 1 ? lastColorInputRef : undefined}
                    type="color"
                    value={color}
                    onChange={(e) => updateMotifColor(i, e.target.value)}
                    className="h-10 w-10 cursor-pointer border border-ink/15 p-0"
                  />
                  {config.colorMotif.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeMotifColor(i)}
                      aria-label="Remove color"
                      className="focus-ring absolute -right-1.5 -top-1.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-ink text-[9px] leading-none text-cream"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {config.colorMotif.length < 6 && (
                <button
                  type="button"
                  onClick={addMotifColor}
                  className="focus-ring flex h-10 w-10 cursor-pointer items-center justify-center border border-dashed border-ink/25 font-mono text-lg text-faint transition-colors duration-150 hover:border-wine hover:text-wine"
                >
                  +
                </button>
              )}
            </div>
          </section>

          {/* Dress code */}
          <section>
            <label className={labelClass}>
              Dress code
              <input
                className={fieldClass}
                value={config.dressCode}
                onChange={(e) => setConfig((c) => ({ ...c, dressCode: e.target.value }))}
                placeholder="Casual, Formal, Beach…"
              />
            </label>
          </section>

          <div className="sticky bottom-0 -mx-6 border-t border-ink/10 bg-cream px-6 py-4">
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={saveStatus === "saving"}
              className="focus-ring w-full cursor-pointer bg-ink px-6 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine disabled:cursor-wait disabled:opacity-70"
            >
              {saveStatus === "saving" ? "Publishing…" : "Save & publish"}
            </button>
            {saveStatus === "error" && (
              <p className="mt-2 text-center font-mono text-xs text-wine">
                Something went wrong — please try again.
              </p>
            )}
          </div>
        </div>
        </div>
      )}

      {/* Right — live preview */}
      <div className="w-full overflow-y-auto lg:h-screen lg:flex-1">
        <div className="border-b border-ink/10 bg-surface px-6 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Live preview</p>
        </div>
        <EvergreenView
          site={config}
          editable
          onFieldChange={setConfig}
          uploadingSlot={uploadingSlot}
          onUploadPhoto={(file, slotKey, folder, apply) => handleUpload(slotKey, folder, file, apply)}
        />
      </div>

      {pendingChecklist && (
        <ConfirmPublishModal
          items={pendingChecklist}
          onGoBack={() => setPendingChecklist(null)}
          onConfirm={() => {
            setPendingChecklist(null);
            publish();
          }}
        />
      )}

      {publishing && <BuildingScreen />}
    </div>
  );
}
