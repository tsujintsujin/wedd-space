export type PhotoSlot = {
  id: string;
  url?: string;
  focalX?: number; // 0-100, default 50
  focalY?: number; // 0-100, default 50
  zoom?: number; // 1+, default 1
};

export type StoryBlock = {
  id: string;
  title: string;
  body: string;
  photo: PhotoSlot;
};

export type MapLocation = {
  label: string;
  address: string;
  lat: number;
  lng: number;
};

export type RsvpEntry = {
  name: string;
  attending: boolean;
  message?: string;
};

export type SiteConfig = {
  templateSlug: string;
  coupleNames: { partnerA: string; partnerB: string };
  weddingDate: string; // "YYYY-MM-DD"
  heroPhotos: PhotoSlot[]; // 5-8
  story: StoryBlock[];
  weddingLocation: MapLocation;
  receptionLocation: MapLocation;
  colorMotif: string[]; // 2-6 hex
  dressCode: string;
  rsvps: RsvpEntry[];
};
