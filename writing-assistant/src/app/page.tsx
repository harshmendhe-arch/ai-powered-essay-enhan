import Link from "next/link";
import { PersonaSelector } from "@/components/ui/PersonaSelector";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--border-color),transparent_60%)] opacity-30" />
      
      {/* Top Navbar Area */}
      <div className="absolute top-6 flex w-full justify-center z-20 px-6">
        <PersonaSelector />
      </div>

      {/* Main card */}
      <section className="panel-container relative z-10 mx-auto w-full max-w-4xl p-8 backdrop-blur sm:p-12">
        <p className="inline-flex rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Student Writing Companion
        </p>
        
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl leading-tight">
          Turn your rough drafts into polished mastery.
        </h1>
        
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          Correct grammar, improve sentence structure, and upgrade vocabulary with
          your local AI model in one focused review. Adapts to your unique style.
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/editor"
            className="rounded-lg bg-[var(--accent-color)] px-5 py-3 text-sm font-semibold text-[var(--accent-fg)] transition hover:opacity-90 shadow-md"
          >
            Start Writing
          </Link>
          <Link
            href="/settings"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-primary)] shadow-sm"
          >
            Configure AI Models
          </Link>
        </div>
      </section>
    </main>
  );
}
