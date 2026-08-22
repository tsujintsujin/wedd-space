import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  premium: "Premium (₱499)",
  allout: "All Out (₱799)",
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, weddingDate, tier, message } = await request.json();

    if (!name || !email || !tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tierLabel = TIER_LABELS[tier] ?? tier;

    const { data, error } = await resend.emails.send({
      from: "wedd.space <onboarding@resend.dev>",
      to: "weddbyjustin@gmail.com",
      replyTo: email,
      subject: `New wedd.space order — ${name} (${tierLabel})`,
      html: `
        <h2>New order inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Wedding date:</strong> ${weddingDate || "not provided"}</p>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "").replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    console.log("Resend accepted order email, id:", data?.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Order form error:", error);
    return NextResponse.json(
      { error: "Failed to send order" },
      { status: 500 }
    );
  }
}
