export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      <p className="mt-2 text-sm text-slate-600">
        Configure Ollama host and model in .env.local.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
        <p>OLLAMA_BASE_URL=http://localhost:11434</p>
        <p>OLLAMA_MODEL=gpt-oss:120b</p>
      </div>
    </main>
  );
}

