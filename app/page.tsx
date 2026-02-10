"use client";

import { FormEvent, useState } from "react";
import { AnimatedRichText } from "@/components/AnimatedRichText";

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic })
      });

      const data = (await response.json()) as {
        text?: string;
        error?: string;
        details?: string;
      };

      if (!response.ok || !data.text) {
        throw new Error(data.error ?? "Could not generate explanation.");
      }

      setResult(data.text);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unexpected error occurred."
      );
      setResult("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-12 md:px-6">
      <header className="space-y-3">
        <p className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
          SketchAI · Next.js + TypeScript + Tailwind + motion/react + Gemini
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Explain ideas with tiny inline animations
        </h1>
        <p className="max-w-2xl text-slate-300">
          Ask about any concept and SketchAI gives a simple explanation with little
          motion moments like a bouncing ball.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950"
      >
        <label htmlFor="topic" className="mb-2 block text-sm text-slate-300">
          What should SketchAI explain?
        </label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Example: How gravity works for kids"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/50 transition focus:ring"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Explaining..." : "Explain it"}
          </button>
        </div>
      </form>

      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-medium text-white">Sketch</h2>
        {error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-200">
            {error}
          </p>
        ) : result ? (
          <AnimatedRichText content={result} />
        ) : (
          <p className="text-slate-400">
            Your explanation will appear here. Tip: ask for “simple with example.”
          </p>
        )}
      </section>
    </main>
  );
}
