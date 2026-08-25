import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EvergreenView from "@/app/templates/evergreen/EvergreenView";
import type { SiteConfig } from "@/app/templates/_lib/types";

async function getSite(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("config")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return (data?.config as SiteConfig | undefined) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite(slug);
  if (!site) return {};

  return { title: `${site.coupleNames.partnerA} & ${site.coupleNames.partnerB}` };
}

export default async function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site) notFound();

  return <EvergreenView site={site} />;
}
