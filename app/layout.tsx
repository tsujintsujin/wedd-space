import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, spaceGrotesk, spaceMono } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wedd.space"),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.wedd.space/#organization",
                  name: "wedd.space",
                  url: "https://www.wedd.space/",
                  description:
                    "Create a wedding website your guests will love in minutes. RSVPs, your story, photo gallery, schedule, and registry — all in one elegant page.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.wedd.space/#website",
                  url: "https://www.wedd.space/",
                  name: "Wedd.space",
                  description:
                    "Create a wedding website your guests will love in minutes. RSVPs, your story, photo gallery, schedule, and registry — all in one elegant page.",
                  inLanguage: "en",
                  publisher: { "@id": "https://www.wedd.space/#organization" },
                },
                {
                  "@type": "Product",
                  "@id": "https://www.wedd.space/#product",
                  name: "wedd.space Wedding Website Builder",
                  description:
                    "A wedding website builder that gathers your story, RSVPs, schedule, photo gallery, and registry onto one shareable page — no app, no login, no reply-all.",
                  url: "https://www.wedd.space/",
                  category: "Wedding Website Builder Software",
                  brand: { "@id": "https://www.wedd.space/#organization" },
                  offers: [
                    {
                      "@type": "Offer",
                      name: "Free",
                      description:
                        "1 wedding page, RSVP tracking, photo gallery (50 photos), wedd.space/yournames link.",
                      price: "0",
                      priceCurrency: "PHP",
                      url: "https://www.wedd.space/#pricing",
                      availability: "https://schema.org/InStock",
                    },
                    {
                      "@type": "Offer",
                      name: "Premium",
                      description:
                        "Everything in Free, plus custom domain support, unlimited photos & guest uploads, multiple events & itineraries, guest list export (CSV), and priority support.",
                      price: "799",
                      priceCurrency: "PHP",
                      url: "https://www.wedd.space/#pricing",
                      availability: "https://schema.org/InStock",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-cream text-ink font-body antialiased">{children}</body>
    </html>
  );
}
