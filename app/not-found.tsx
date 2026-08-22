import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | wedd.space",
  description: "This page doesn't exist.",
  robots: "noindex, nofollow",
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-4xl italic text-ink">404</h1>
      <p className="max-w-sm text-muted">
        This page doesn&apos;t exist. Head back to the homepage.
      </p>
      <Link
        href="/"
        className="focus-ring cursor-pointer bg-ink px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-wine"
      >
        Back to homepage
      </Link>
    </main>
  );
}
