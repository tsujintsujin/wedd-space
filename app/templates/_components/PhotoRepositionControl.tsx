"use client";

import { useEffect, useRef } from "react";

// A small built-in overscan floor, rather than 1, so there's always room to
// pan in both directions the moment reposition mode opens — at exactly 1x,
// object-fit: cover leaves zero slack on whichever axis already matches the
// frame (e.g. a portrait photo in a wide frame has no horizontal slack).
const MIN_ZOOM = 1.15;
const MAX_ZOOM = 3;

export default function PhotoRepositionControl({
  focalX,
  focalY,
  zoom,
  onChange,
  onDone,
}: {
  focalX: number;
  focalY: number;
  zoom: number;
  onChange: (focalX: number, focalY: number, zoom: number) => void;
  onDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    startX: number;
    startY: number;
    startFocalX: number;
    startFocalY: number;
  } | null>(null);
  const latest = useRef({ focalX, focalY, zoom });
  latest.current = { focalX, focalY, zoom };

  useEffect(() => {
    if (zoom < MIN_ZOOM) onChange(focalX, focalY, MIN_ZOOM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, latest.current.zoom - e.deltaY * 0.002));
      onChange(latest.current.focalX, latest.current.focalY, next);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [onChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startFocalX: latest.current.focalX,
      startFocalY: latest.current.focalY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dxPct = ((e.clientX - dragState.current.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - dragState.current.startY) / rect.height) * 100;
    const nextX = Math.min(100, Math.max(0, dragState.current.startFocalX - dxPct));
    const nextY = Math.min(100, Math.max(0, dragState.current.startFocalY - dyPct));
    onChange(nextX, nextY, latest.current.zoom);
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
      className="absolute inset-0 z-10 cursor-move touch-none select-none bg-ink/10 [-webkit-user-drag:none]"
    >
      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cream">
        Drag to reposition · Scroll to zoom
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDone();
        }}
        className="focus-ring absolute bottom-3 right-3 cursor-pointer bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors duration-150 hover:bg-wine"
      >
        Done
      </button>
    </div>
  );
}
