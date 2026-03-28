import Link from "next/link";

const disciplines = [
  {
    icon: "⚙️",
    label: "Engineering & STEM",
    description: "Technical reports, lab write-ups, research summaries, and project documentation.",
    tone: "technical",
    color: "border-blue-200 bg-blue-50 text-blue-800",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    icon: "📖",
    label: "Literature & Humanities",
    description: "Literary essays, critical analyses, creative writing, and reflective pieces.",
    tone: "literary",
    color: "border-purple-200 bg-purple-50 text-purple-800",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    icon: "🎓",
    label: "General Academic",
    description: "University assignments, formal essays, research papers, and reports.",
    tone: "academic",
    color: "border-emerald-200 bg-emerald-50 text-emerald-800",
    badge: "bg-emerald-100 text-emerald-700",
  },
];

const features = [
  {
    icon: "🔍",
    title: "Grammar Detection",
    description:
      "Spot subject-verb disagreements, incorrect tenses, missing articles, and more with AI-powered analysis.",
  },
  {
    icon: "✍️",
    title: "Sentence Enhancement",
    description:
      "Rewrite awkward or unclear sentences to match your discipline's writing style.",
  },
  {
    icon: "📚",
    title: "Vocabulary Upgrade",
    description:
      "Replace weak or imprecise words with stronger, academically appropriate alternatives.",
  },
  {
    icon: "📊",
    title: "Readability Score",
    description:
      "See how readable your essay is and track improvement after each revision.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* Hero */}
      <section className="relative flex flex-col items-center px-4 py-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1d4ed840,transparent_60%)]" />
        <span className="relative inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
          🎓 Student Writing Companion
        </span>
        <h1 className="relative mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Turn rough drafts into{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            polished essays
          </span>
        </h1>
        <p className="relative mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          AI-powered grammar correction, sentence enhancement, and vocabulary
          suggestions — tailored for engineering, literature, and general
          college students.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/editor"
            className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-400 hover:shadow-blue-500/25"
          >
            Open Essay Editor →
          </Link>
          <Link
            href="/settings"
            className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Configure Model
          </Link>
        </div>
      </section>

      {/* Discipline cards */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          Choose your discipline in the editor
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {disciplines.map((d) => (
            <div
              key={d.tone}
              className={`rounded-2xl border p-5 transition ${d.color}`}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{d.icon}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${d.badge}`}>
                  {d.label}
                </span>
              </div>
              <p className="text-sm leading-6">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          What the assistant does
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 shadow-sm"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-1 text-sm font-semibold text-slate-100">{f.title}</h3>
              <p className="text-xs leading-5 text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
