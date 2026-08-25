import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { site as defaultSite } from "@/app/templates/evergreen/data";
import type { SiteConfig } from "@/app/templates/_lib/types";
import SiteEditor from "./SiteEditor";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: row } = await supabase
    .from("sites")
    .select("config")
    .eq("user_id", user.id)
    .maybeSingle();

  const initialConfig: SiteConfig = (row?.config as SiteConfig | null) ?? defaultSite;

  return <SiteEditor initialConfig={initialConfig} />;
}
