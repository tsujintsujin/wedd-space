import Image from "next/image";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * A photo slot: a real uploaded photo when `url` is set (from Cloudinary),
 * otherwise a soft duotone wash from the site's motif colors + a
 * photographic vignette + grain — a stand-in that reads as "photo not
 * uploaded yet," not clip art.
 */
export default function PhotoSlot({
  motif,
  index,
  className,
  url,
  focalX = 50,
  focalY = 50,
  zoom = 1,
}: {
  motif: string[];
  index: number;
  className?: string;
  url?: string;
  focalX?: number;
  focalY?: number;
  zoom?: number;
}) {
  if (url) {
    // Panning is done entirely via transform, not object-position: at zoom 1,
    // object-position's crop math is already "maxed out" whenever the source
    // photo's aspect happens to closely match the frame's (common for
    // landscape hero photos), leaving zero slack for object-position to
    // redistribute — and it has no way to see the extra room a later
    // transform:scale() creates, since it's resolved before any transform is
    // applied. Keeping object-position fixed at center and doing pan+zoom
    // together as one transform sidesteps that entirely: maxOffset is
    // derived from zoom itself, so translating within it can never reveal
    // empty space, on either axis, regardless of the source photo's aspect.
    const maxOffset = ((zoom - 1) / zoom) * 50;
    // Flipped (50 - focal, not focal - 50): dragging right should make the
    // photo itself follow the cursor and slide right, not act like a window
    // sliding the opposite way.
    const panX = ((50 - focalX) / 50) * maxOffset;
    const panY = ((50 - focalY) / 50) * maxOffset;

    return (
      <div className={`relative overflow-hidden ${className ?? "aspect-[4/5] w-full"}`}>
        <Image
          src={url}
          alt=""
          fill
          draggable={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover [-webkit-user-drag:none]"
          style={{ transform: `scale(${zoom}) translate(${panX}%, ${panY}%)` }}
        />
      </div>
    );
  }

  const a = motif[index % motif.length];
  const b = motif[(index + 2) % motif.length] ?? a;
  const angle = 118 + ((index * 29) % 44);

  return (
    <div className={`relative overflow-hidden ${className ?? "aspect-[4/5] w-full"}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `linear-gradient(${angle}deg, ${a}D9 0%, ${b}A6 55%, #F5EAD8 135%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_15%,transparent_45%,rgba(36,26,18,0.32)_100%)]"
      />
      <span className="sr-only">Sample photo placeholder</span>
    </div>
  );
}
