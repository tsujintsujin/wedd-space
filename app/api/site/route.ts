import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SiteConfig } from "@/app/templates/_lib/types";

const RESERVED_SLUGS = new Set([
  "dashboard",
  "templates",
  "api",
  "auth",
  "sitemap.xml",
  "robots.txt",
  "icon.svg",
  "favicon.ico",
]);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  config: SiteConfig,
  userId: string
): Promise<string> {
  const base =
    slugify(`${config.coupleNames.partnerA}-and-${config.coupleNames.partnerB}`) ||
    `couple-${userId.slice(0, 8)}`;

  let candidate = base;
  let suffix = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!RESERVED_SLUGS.has(candidate)) {
      const { data } = await supabase.from("sites").select("id").eq("slug", candidate).maybeSingle();
      if (!data) return candidate;
    }
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const config: SiteConfig = await request.json();

  const { data: existing } = await supabase
    .from("sites")
    .select("slug")
    .eq("user_id", user.id)
    .maybeSingle();

  const slug = existing?.slug || (await generateUniqueSlug(supabase, config, user.id));

  const { error } = await supabase.from("sites").upsert(
    {
      user_id: user.id,
      template_slug: "evergreen",
      config,
      slug,
      published: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Failed to save site:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, slug });
}
