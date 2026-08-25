import type { SiteConfig } from "../_lib/types";

export const site: SiteConfig = {
  templateSlug: "evergreen",
  coupleNames: { partnerA: "Emma", partnerB: "Daniel" },
  weddingDate: "2027-06-12",
  heroPhotos: [
    { id: "hero-1" },
    { id: "hero-2" },
    { id: "hero-3" },
    { id: "hero-4" },
    { id: "hero-5" },
    { id: "hero-6" },
    { id: "hero-7" },
  ],
  story: [
    {
      id: "story-1",
      title: "How we met",
      body: "We met on a rainy Tuesday at a coffee shop in Portland, both reaching for the last blueberry scone. Daniel insisted Emma take it. She didn't — they split it instead.",
      photo: { id: "story-photo-1" },
    },
    {
      id: "story-2",
      title: "The proposal",
      body: "Three years later, on a hike up Mount Hood, Daniel asked Emma to marry him at the exact spot they'd stopped for their first-ever conversation about the future.",
      photo: { id: "story-photo-2" },
    },
    {
      id: "story-3",
      title: "What's next",
      body: "We can't wait to celebrate with the people who've shaped our story so far — and start the next chapter surrounded by all of you.",
      photo: { id: "story-photo-3" },
    },
  ],
  weddingLocation: {
    label: "Willow Creek Chapel",
    address: "482 Orchard Lane, Sonoma, CA 95476",
    lat: 38.2919,
    lng: -122.4581,
  },
  receptionLocation: {
    label: "The Hawthorne Barn",
    address: "17 Vineyard Road, Sonoma, CA 95476",
    lat: 38.2975,
    lng: -122.4602,
  },
  colorMotif: ["#7E2436", "#EBD9B4", "#5C4A38"],
  dressCode: "Garden formal — think soft neutrals and earth tones",
  rsvps: [
    { name: "Olivia Bennett", attending: true, message: "Wouldn't miss it for the world! So happy for you two." },
    { name: "Marcus Reyes", attending: true, message: "Counting down the days already." },
    { name: "Priya Shah", attending: true },
    { name: "The Whitfield Family", attending: true, message: "Bringing the whole crew — see you there!" },
    { name: "Jordan Lee", attending: false, message: "Wish we could be there — sending all our love from afar." },
  ],
};
