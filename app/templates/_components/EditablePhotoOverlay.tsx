"use client";

import { useState, useRef } from "react";
import PhotoSlot from "./PhotoSlot";
import PhotoRepositionControl from "./PhotoRepositionControl";

export default function EditablePhotoOverlay({
  motif,
  index,
  url,
  className,
  editable,
  uploading,
  onUpload,
  focalX = 50,
  focalY = 50,
  zoom = 1,
  onPositionChange,
}: {
  motif: string[];
  index: number;
  url?: string;
  className?: string;
  editable?: boolean;
  uploading?: boolean;
  onUpload?: (file: File) => void;
  focalX?: number;
  focalY?: number;
  zoom?: number;
  onPositionChange?: (focalX: number, focalY: number, zoom: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [repositioning, setRepositioning] = useState(false);

  if (!editable || !onUpload) {
    return (
      <PhotoSlot
        motif={motif}
        index={index}
        url={url}
        className={className}
        focalX={focalX}
        focalY={focalY}
        zoom={zoom}
      />
    );
  }

  return (
    <div className="group relative h-full w-full">
      <PhotoSlot
        motif={motif}
        index={index}
        url={url}
        className={className}
        focalX={focalX}
        focalY={focalY}
        zoom={zoom}
      />

      {repositioning && url && onPositionChange ? (
        <PhotoRepositionControl
          focalX={focalX}
          focalY={focalY}
          zoom={zoom}
          onChange={onPositionChange}
          onDone={() => setRepositioning(false)}
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="focus-ring absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/0 font-mono text-[10px] uppercase tracking-[0.14em] text-transparent transition-colors duration-150 hover:bg-ink/55 hover:text-cream disabled:cursor-wait"
          >
            {uploading ? "Uploading…" : url ? "Change photo" : "Upload photo"}
          </button>
          {url && onPositionChange && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRepositioning(true);
              }}
              aria-label="Reposition photo"
              title="Reposition photo"
              className="focus-ring absolute right-3 top-3 z-10 flex cursor-pointer items-center gap-2 rounded-full border border-cream/50 bg-ink/70 py-2.5 pl-3 pr-4 text-cream opacity-0 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-opacity duration-150 hover:bg-ink/85 group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="5 9 2 12 5 15" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="9 5 12 2 15 5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15 19 12 22 9 19" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="19 9 22 12 19 15" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Reposition</span>
            </button>
          )}
        </>
      )}

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
