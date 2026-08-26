import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <Link href="/#top" className="cursor-pointer font-display text-xl italic text-ink">
          wedd<span className="text-wine not-italic">.space</span>
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href="#features"
            className="focus-ring cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors duration-200 hover:text-wine"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="focus-ring cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors duration-200 hover:text-wine"
          >
            Pricing
          </a>
          <a
            href="#top"
            className="focus-ring cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors duration-200 hover:text-wine"
          >
            Back to top
          </a>
        </nav>

        <p className="font-mono text-xs text-faint">
          &copy; {new Date().getFullYear()} wedd.space &mdash; made for couples
          who hate group chats.
        </p>
      </div>
    </footer>
  );
}
