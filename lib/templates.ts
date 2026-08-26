export type Template = {
  slug: string;
  name: string;
  photos: number;
  views: number;
  likes: number;
  thumbnail: string;
  preview: string;
  previewWidth: number;
  previewHeight: number;
};

export const templates: Template[] = [
  {
    slug: "becky-richard",
    name: "Bella in Love",
    photos: 11,
    views: 1240,
    likes: 86,
    thumbnail: "/templates/thumbs/becky-richard.png",
    preview: "/templates/previews/becky-richard.png",
    previewWidth: 1920,
    previewHeight: 5793,
  },
  {
    slug: "marry-monday",
    name: "Marry Monday",
    photos: 6,
    views: 860,
    likes: 54,
    thumbnail: "/templates/thumbs/marry-monday.png",
    preview: "/templates/previews/marry-monday.png",
    previewWidth: 1920,
    previewHeight: 4487,
  },
  {
    slug: "ashley-jeff",
    name: "Ashley & Jeff",
    photos: 4,
    views: 615,
    likes: 39,
    thumbnail: "/templates/thumbs/ashley-jeff.png",
    preview: "/templates/previews/ashley-jeff.png",
    previewWidth: 1920,
    previewHeight: 3303,
  },
];
