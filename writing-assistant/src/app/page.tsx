import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950 px-4 py-16 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed855,transparent_55%)]" />
      <section className="relative z-10 mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/85 p-8 shadow-2xl backdrop-blur sm:p-12">
        <p className="inline-flex rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
          Student Writing Companion
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Turn rough drafts into polished academic essays.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Correct grammar, improve sentence structure, and upgrade vocabulary with
          your local Ollama model in one focused review.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/editor"
            className="rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Open Essay Editor
          </Link>
          <Link
            href="/settings"
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Model Settings
          </Link>
        </div>
      </section>
    </main>
  );
}
