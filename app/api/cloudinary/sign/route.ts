import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }

  const { folder } = (await request.json()) as { folder?: string };
  const scopedFolder = `wedd-space/${user.id}/${folder ?? "misc"}`.replace(/[^a-zA-Z0-9/_-]/g, "");

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${scopedFolder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(paramsToSign).digest("hex");

  return NextResponse.json({
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: scopedFolder,
  });
}
