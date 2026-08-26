import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Playfair_Display } from "next/font/google";

export const metadata: Metadata = {
  title: "Ashley & Jeff | Sample wedd.space Page",
  robots: "noindex, follow",
};

const display = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-aj-display" });
const sans = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-aj-sans" });
const quote = Playfair_Display({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-aj-quote" });

const INK = "#1F2421";
const MUTED = "#6B6F6C";
const CREAM = "#F3EDE3";
const DARK = "#20302B";

function Img({ label, src, className }: { label: string; src?: string; className?: string }) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-neutral-400 bg-neutral-200 text-center font-sans text-[11px] uppercase tracking-[0.14em] text-neutral-500 ${className ?? ""}`}
      style={{ fontFamily: "var(--font-aj-sans)" }}
    >
      {label}
    </div>
  );
}

const details = [
  {
    label: "Location",
    body: (
      <>
        Our wedding will be held at the <strong>Cannon River Winery</strong> in Cannon Falls, Minnesota. The ceremony
        will take place outdoors at Cannon River Winery&apos;s vineyard nestled in the beautiful Sogn Valley followed
        by the reception at the winery.
      </>
    ),
    link: "Get Directions",
  },
  {
    label: "Transportation",
    body: (
      <>
        All guests are required to ride a shuttle to the ceremony. The shuttle will depart Cannon River Winery at
        3:45pm. Please arrive promptly as not to delay the start of the celebration. Reception immediately follow at
        Cannon River Winery&apos;s Event Center.
      </>
    ),
    link: undefined,
  },
  {
    label: "Accommodations",
    body: (
      <>
        We have reserved 25 rooms at Treasure Island Resort (under Ashley Jensen) with free shuttle service to and
        from the reception. The hotel is about a 15-20 minute drive from Cannon Falls. <strong>Shuttles depart from
        the hotel at 3:30pm</strong>
      </>
    ),
    link: "View The Hotel",
  },
];

const timeline = [
  { icon: "\u{1F68C}", label: "Shuttle Departure", time: "3:45PM" },
  { icon: "\u{1F48D}", label: "Ceremony Begins", time: "4:30PM" },
  { icon: "\u{1F942}", label: "Cocktail Hour", time: "5:30PM" },
  { icon: "\u{1F37D}️", label: "Dinner Served", time: "6:30PM" },
  { icon: "\u{1F3B6}", label: "Open Dance Floor", time: "8:00PM" },
];

export default function AshleyJeffPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${quote.variable} min-h-dvh bg-white`}
      style={{ color: INK, fontFamily: "var(--font-aj-sans)" }}
    >
      {/* Hero */}
      <header className="relative">
        <Img label="Hero photo — waterfall, couple on a log" src="/examples/ashley-jeff/hero.jpg" className="h-[520px] w-full md:h-[620px]" />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1
            className="text-6xl tracking-wide md:text-8xl"
            style={{ fontFamily: "var(--font-aj-display)" }}
          >
            Ashley <span className="align-middle text-3xl md:text-4xl">&amp;</span> Jeff
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.32em] md:text-sm">
            Are getting married July 8, 2017
          </p>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">&#8964;</div>
      </header>

      {/* Story */}
      <section id="story" className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <h2 className="text-center text-lg font-bold uppercase tracking-[0.1em]">Our Story</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.1em]">Ashley Jensen</h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
              The first day we met was at Jeff&apos;s parents&apos; house. At the time, I was working with his
              brother, Tyler, who invited me and some other friends over to their house. When I walked into their
              house, I saw Jeff sitting at the counter. My first impression of him was that he was extremely quiet
              and shy. Little did I know, he was so much more. He is the most easy going, hard-working man with a
              huge heart and a lot of patience. He always pushes me to be a better person and encourages me to
              never stop growing. I never would have guessed that he would have asked me to marry him (with a puppy
              that I bugged him about for months). I can not wait to spend the rest of my life with him by my side.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.1em]">Jeff Farr</h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
              Ashley and I met through my brother, who jokingly likes to take all the credit. I remember the first
              time we met back in 2011. A bit intoxicated (most would say), I thought Ashley was beautiful. It
              didn&apos;t take long for me to find out that Ashley is kind, thoughtful, goofy, fun and a loving
              person. What attracted me to Ashley the most was that she was so kind-hearted. Ashley means so much to
              me and I can&apos;t believe she is actually going to marry me!
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: MUTED }} />
          <p
            className="text-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-aj-quote)", color: INK }}
          >
            Sometimes the grandest adventure is not where you go but who you&apos;re with
          </p>
          <div className="mx-auto mt-6 h-px w-16" style={{ backgroundColor: MUTED }} />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="pt-16">
        <h2 className="px-6 text-center text-lg font-bold uppercase tracking-[0.1em] md:px-10">Gallery</h2>
        <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2">
          <Img label="Forest &amp; mountain photo" src="/examples/ashley-jeff/forest.jpg" className="aspect-[4/3] w-full md:aspect-auto md:h-[420px]" />
          <div className="relative flex h-[420px] items-center justify-center gap-3 bg-neutral-100 p-4">
            <Img label="Couple walking" src="/examples/ashley-jeff/walking.jpg" className="h-[260px] w-[200px]" />
            <Img label="Mossy rocks" src="/examples/ashley-jeff/mossy.jpg" className="h-[220px] w-[180px] translate-y-6" />
            <button
              aria-label="Next photo"
              className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center text-white"
              style={{ backgroundColor: DARK }}
            >
              &#8250;
            </button>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="px-6 py-24 md:px-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-bold uppercase tracking-[0.1em]">Wedding Details</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            {details.map((d) => (
              <div key={d.label}>
                <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>{d.label}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>{d.body}</p>
                {d.link && (
                  <a href="#" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.1em] underline underline-offset-4">
                    {d.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* icon timeline */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-10 bg-white p-10 text-center shadow-sm sm:grid-cols-5">
          {timeline.map((t) => (
            <div key={t.label}>
              <span className="text-2xl" aria-hidden="true">{t.icon}</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.08em]" style={{ color: MUTED }}>{t.label}</p>
              <p className="mt-1 text-sm font-bold">{t.time}</p>
            </div>
          ))}
        </div>

        {/* registry, folded into details */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>Registry</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: MUTED }}>
            Everything we put on the registries are things that we&apos;ll love, but honestly, the most important
            gift you can bring us is having you and your dancing shoes at our celebration.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-70">
            <span className="text-sm font-bold uppercase tracking-[0.04em]">Bed Bath &amp; Beyond</span>
            <span className="text-sm font-light">Crate&amp;Barrel</span>
            <span className="text-sm font-bold">&#9733; macy&apos;s</span>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="px-6 py-24 text-center md:px-10">
        <h2
          className="text-5xl tracking-wide md:text-6xl"
          style={{ fontFamily: "var(--font-aj-display)" }}
        >
          Will You Be There?
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed" style={{ color: MUTED }}>
          Kindly respond by June 1, 2017 so we can finalize the details with the winery.
        </p>
        <a
          href="#rsvp"
          className="mt-7 inline-block px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
          style={{ backgroundColor: DARK }}
        >
          RSVP Now
        </a>
      </section>

      <footer className="px-6 py-10 text-center md:px-10">
        <p className="text-xs" style={{ color: MUTED }}>All made possible with a helping &#128062;</p>
      </footer>
    </div>
  );
}
