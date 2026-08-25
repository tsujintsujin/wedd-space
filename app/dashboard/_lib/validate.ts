import type { SiteConfig } from "@/app/templates/_lib/types";

export type ChecklistItem = { label: string; done: boolean };

export function getChecklist(config: SiteConfig): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  items.push({ label: "Partner A's name", done: !!config.coupleNames.partnerA.trim() });
  items.push({ label: "Partner B's name", done: !!config.coupleNames.partnerB.trim() });
  items.push({ label: "Wedding date", done: !!config.weddingDate });

  config.heroPhotos.forEach((photo, i) => {
    items.push({ label: i === 0 ? "Hero photo" : `Photo ${i + 1}`, done: !!photo.url });
  });

  config.story.forEach((block, i) => {
    const label = block.title.trim() || `Story block ${i + 1}`;
    items.push({ label: `Story title ${i + 1}`, done: !!block.title.trim() });
    items.push({ label: `Story text — ${label}`, done: !!block.body.trim() });
    items.push({ label: `Story photo — ${label}`, done: !!block.photo.url });
  });

  items.push({ label: "Ceremony venue name", done: !!config.weddingLocation.label.trim() });
  items.push({ label: "Ceremony address", done: !!config.weddingLocation.address.trim() });
  items.push({ label: "Reception venue name", done: !!config.receptionLocation.label.trim() });
  items.push({ label: "Reception address", done: !!config.receptionLocation.address.trim() });

  items.push({ label: "Dress code", done: !!config.dressCode.trim() });

  return items;
}

export function getMissingItems(config: SiteConfig): string[] {
  return getChecklist(config)
    .filter((item) => !item.done)
    .map((item) => item.label);
}
