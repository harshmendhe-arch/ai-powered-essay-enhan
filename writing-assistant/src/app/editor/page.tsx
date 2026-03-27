"use client";

import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import ChangesSummary from "@/components/comparison/ChangesSummary";
import SideBySideView from "@/components/comparison/SideBySideView";
import GrammarPanel from "@/components/correction/GrammarPanel";
import CharacterCounter from "@/components/editor/CharacterCounter";
import EssayInput from "@/components/editor/EssayInput";
import ReadabilityScore from "@/components/editor/ReadabilityScore";
import EnhancedOutput from "@/components/enhancement/EnhancedOutput";
import WordSuggestionPanel from "@/components/vocabulary/WordSuggestionPanel";
import { estimateReadability } from "@/lib/readability";
import type { FullReviewApiResponse } from "@/types/api";
import type { EssayReviewResponse } from "@/types/essay";

const starterEssay =
  "Students today need strong writing skills to communicate complex ideas clearly. However, many essays lose impact because of grammar mistakes, repetitive vocabulary, and unclear sentence flow.";

const MODEL_STORAGE_KEY = "selected_ollama_model";

interface ModelsResponse {
  models: string[];
  defaultModel: string;
  message?: string;
}

export default function EditorPage() {
  const [essay, setEssay] = useState(starterEssay);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<EssayReviewResponse | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [modelStatus, setModelStatus] = useState<string>("Loading models...");

  const readability = useMemo(() => estimateReadability(essay), [essay]);

  useEffect(() => {
    let mounted = true;

    async function loadModels() {
      try {
        const response = await fetch("/api/models", { cache: "no-store" });
        const payload = (await response.json()) as ModelsResponse;
        const models = Array.isArray(payload.models) ? payload.models : [];
        const uniqueModels = [...new Set(models)];

        if (!mounted) {
          return;
        }

        setAvailableModels(uniqueModels);

        const storedModel =
          typeof window !== "undefined"
            ? window.localStorage.getItem(MODEL_STORAGE_KEY)
            : null;

        const preferred =
          storedModel && uniqueModels.includes(storedModel)
            ? storedModel
            : uniqueModels.includes(payload.defaultModel)
              ? payload.defaultModel
              : uniqueModels[0] ?? payload.defaultModel;

        setSelectedModel(preferred);
        setModelStatus(
          uniqueModels.length > 0
            ? `${uniqueModels.length} model(s) available`
            : payload.message ?? "No local models found"
        );
      } catch (loadError) {
        if (!mounted) {
          return;
        }

        setAvailableModels([]);
        setModelStatus(`Unable to load models: ${String(loadError)}`);
      }
    }

    loadModels();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedModel) {
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(MODEL_STORAGE_KEY, selectedModel);
    }
  }, [selectedModel]);

  async function runReview() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/full-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: essay,
          tone: "academic",
          model: selectedModel || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const payload = (await response.json()) as FullReviewApiResponse;
      setReview(payload.result);
    } catch (requestError) {
      setError(String(requestError));
    } finally {
      setLoading(false);
    }
  }

  function exportGrammarPdf() {
    if (!review) {
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Grammar Corrected Essay", margin, margin);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `Model: ${selectedModel || "default"} | Generated: ${new Date().toLocaleString()}`,
      margin,
      margin + 18
    );

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(review.grammar.correctedText, contentWidth);
    let y = margin + 46;

    for (const line of lines) {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(line, margin, y);
      y += 16;
    }

    doc.save("grammar-corrected-essay.pdf");
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[linear-gradient(170deg,#fffdf7_0%,#f8fafc_50%,#f0f9ff_100%)]">
      <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                Academic Writing Studio
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Essay Refiner
              </h1>
            </div>
            <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Powered by Ollama
            </span>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Paste your essay, run AI review, and get grammar corrections, improved
            sentence flow, and stronger vocabulary with a student-friendly comparison.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              {modelStatus}
            </div>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ollama Model
              <select
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
              >
                {availableModels.length === 0 ? (
                  <option value="">Default model</option>
                ) : (
                  availableModels.map((modelName) => (
                    <option key={modelName} value={modelName}>
                      {modelName}
                    </option>
                  ))
                )}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CharacterCounter text={essay} />
            <ReadabilityScore score={readability} />
          </div>

          <div className="mt-4">
            <EssayInput value={essay} onChange={setEssay} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={runReview}
              disabled={loading || essay.trim().length === 0}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? "Reviewing with Ollama..." : "Run Full Review"}
            </button>
            <span className="text-xs text-slate-500">
              Grammar to enhancement to vocabulary pipeline
            </span>
          </div>

          {error ? (
            <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
        </section>

        {review ? (
          <>
            <ChangesSummary
              correctedIssues={review.comparison.correctedIssues}
              changedSentences={review.comparison.changedSentences}
            />

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Grammar Corrected Draft
                </h2>
                <button
                  type="button"
                  onClick={exportGrammarPdf}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Download PDF
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                {review.grammar.correctedText}
              </p>
            </section>

            <SideBySideView
              original={review.originalText}
              improved={review.enhancement.enhancedText}
            />

            <EnhancedOutput text={review.enhancement.enhancedText} />

            <div className="grid gap-4 lg:grid-cols-2">
              <GrammarPanel corrections={review.grammar.corrections} />
              <WordSuggestionPanel suggestions={review.vocabulary.suggestions} />
            </div>
          </>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-600">
            Your reviewed essay will appear here after you run the full review.
          </section>
        )}
      </div>
    </main>
  );
}
