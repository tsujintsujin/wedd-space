import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { instrumentSerif, spaceGrotesk, spaceMono } from "./fonts";
import Toaster from "./components/Toaster";

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
                        "1 wedding page at wedd.space/yournames, RSVP tracking, photo gallery (up to ~25 photos). 1-day delivery.",
                      price: "0",
                      priceCurrency: "PHP",
                      url: "https://www.wedd.space/#pricing",
                      availability: "https://schema.org/InStock",
                    },
                    {
                      "@type": "Offer",
                      name: "Premium",
                      description:
                        "Everything in Free, plus multiple events & itineraries, guest list export (CSV), photo gallery (up to ~150 photos), and priority support. 3-day delivery.",
                      price: "499",
                      priceCurrency: "PHP",
                      url: "https://www.wedd.space/#pricing",
                      availability: "https://schema.org/InStock",
                    },
                    {
                      "@type": "Offer",
                      name: "All Out",
                      description:
                        "Everything in Premium, plus a custom design built around your motif with a personal consultation. 7-day delivery.",
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
      <body className="bg-cream text-ink font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
