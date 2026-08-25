import type { Metadata } from "next";
import { site } from "./data";
import EvergreenView from "./EvergreenView";

export const metadata: Metadata = {
  title: `${site.coupleNames.partnerA} & ${site.coupleNames.partnerB}`,
};

export default function EvergreenTemplate() {
  return <EvergreenView site={site} />;
}
