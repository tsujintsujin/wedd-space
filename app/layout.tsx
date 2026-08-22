import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, spaceGrotesk, spaceMono } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedd.space"),
  title: "Wedd.space | Your Wedding Website, Beautifully Simple",
  description:
    "Create a wedding website your guests will love in minutes. RSVPs, your story, photo gallery, schedule, and registry — all in one elegant page.",
  robots: "index, follow",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Wedd.space | Your Wedding Website, Beautifully Simple",
    description:
      "Create a wedding website your guests will love in minutes. RSVPs, your story, photo gallery, schedule, and registry — all in one elegant page.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedd.space | Your Wedding Website, Beautifully Simple",
    description:
      "Create a wedding website your guests will love in minutes. RSVPs, your story, photo gallery, schedule, and registry.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${instrumentSerif.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%23F5EAD8'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-style='italic' font-size='19' font-weight='600' fill='%237E2436' text-anchor='middle'%3Ew%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className="bg-cream text-ink font-body antialiased">{children}</body>
    </html>
  );
}
