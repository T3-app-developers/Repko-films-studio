"use client";

import { useState } from "react";

const presets = [
  "Cinematic still",
  "Product hero",
  "Storyboard frame",
  "Moody monochrome",
];

const providerOptions = [
  { label: "Google AI Studio (Imagen)", href: "https://aistudio.google.com/" },
  { label: "OpenAI Images", href: "https://platform.openai.com/docs/guides/images" },
  { label: "Stability AI", href: "https://platform.stability.ai/" },
];

const seedGenerations = [
  {
    name: "City dusk concept",
    detail: "Preset: Cinematic still · 16:9 · Seed 30211",
    status: "Ready",
  },
  {
    name: "Alley rain pass",
    detail: "Preset: Storyboard frame · 4:3 · Seed 7721",
    status: "Queued",
  },
];

export default function AiImagePage() {
  const [recentGenerations, setRecentGenerations] = useState(seedGenerations);
  const [draftCount, setDraftCount] = useState(0);
  const [activeProvider, setActiveProvider] = useState(providerOptions[0]?.label ?? "");

  const createImageJob = () => {
    const nextCount = draftCount + 1;
    setDraftCount(nextCount);
    setRecentGenerations((current) => [
      {
        name: `New still concept ${nextCount}`,
        detail: "Preset: Cinematic still · 16:9 · Seed auto",
        status: "Queued",
      },
      ...current,
    ]);
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI Image</p>
        <h2 className="mt-2 text-2xl font-semibold">Generate stills</h2>
        <p className="mt-2 text-sm text-white/70">
          Submit image jobs with presets, seeds, and safety checks before rendering.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm font-semibold">Prompt builder</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <label className="text-white/50" htmlFor="image-provider">
              Provider
            </label>
            <select
              id="image-provider"
              className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white/70"
              value={activeProvider}
              onChange={(event) => setActiveProvider(event.target.value)}
            >
              {providerOptions.map((provider) => (
                <option key={provider.label} value={provider.label}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 space-y-3 text-xs text-white/60">
            <div className="rounded-xl border border-white/10 bg-black/60 p-3">
              Golden hour establishing shot of the forest studio, warm fog, anamorphic.
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Presets</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <span
                    key={preset}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {preset}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/10 px-3 py-1">Aspect: 16:9</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Seed: 30211</span>
            </div>
          </div>
          <button
            type="button"
            onClick={createImageJob}
            className="mt-4 rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black"
          >
            Create image job
          </button>
          {draftCount > 0 && (
            <p className="mt-3 text-xs text-white/50">
              Job queued. Check the jobs tab for live status and logs.
            </p>
          )}
          <div className="mt-4 space-y-2 text-xs text-white/60">
            {providerOptions.map((provider) => (
              <a
                key={provider.label}
                className="block rounded-lg border border-white/10 px-3 py-2 text-white/70 transition hover:border-white/30"
                href={provider.href}
                target="_blank"
                rel="noreferrer"
              >
                Open {provider.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm font-semibold">Recent generations</p>
          <div className="mt-4 space-y-3 text-xs text-white/70">
            {recentGenerations.map((item) => (
              <div key={item.name} className="rounded-xl border border-white/10 bg-black/60 p-3">
                <p className="text-sm text-white">{item.name}</p>
                <p className="mt-1 text-xs text-white/50">{item.detail}</p>
                <p className="mt-2 text-xs text-white/70">Status: {item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
