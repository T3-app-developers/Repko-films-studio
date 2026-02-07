"use client";

import { useState } from "react";

import type { AudioDialogue, TimelineAsset, TimelineClip } from "./types";

export type TimelinePanelProps = {
  clips: TimelineClip[];
  assets: TimelineAsset[];
  dialogues: AudioDialogue[];
  providerOptions: Array<{ label: string; href: string }>;
  helperText: string;
};

export function TimelinePanel({
  clips,
  assets,
  dialogues,
  providerOptions,
  helperText,
}: TimelinePanelProps) {
  const [exportQueued, setExportQueued] = useState(false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [uploadQueued, setUploadQueued] = useState(false);
  const [voiceQueued, setVoiceQueued] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [activeProvider, setActiveProvider] = useState(providerOptions[0]?.label ?? "");

  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <h3 className="text-lg font-semibold">Timeline & export</h3>
      <p className="mt-2 text-xs text-white/50">{helperText}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Video preview</p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60">
                Sequence: 1920×1080 · 24fps
              </span>
            </div>
            <div className="mt-3 flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/60 text-xs text-white/40">
              {previewPlaying ? "Preview playing… (placeholder)" : "Preview window (placeholder)"}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPreviewPlaying((current) => !current)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
              >
                {previewPlaying ? "Pause preview" : "Play preview"}
              </button>
              <button
                type="button"
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
              >
                Snapshot frame
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {clips.map((clip) => (
              <div key={clip.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{clip.name}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60">
                    {clip.duration}
                  </span>
                </div>
                <p className="mt-2 text-xs text-white/50">{clip.trim}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm font-semibold">Export settings</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setExportQueued(true)}
                className="rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black"
              >
                {exportQueued ? "Export queued" : "Export MP4"}
              </button>
              <button
                type="button"
                onClick={() => setWatermarkEnabled((current) => !current)}
                className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/70"
              >
                {watermarkEnabled ? "Watermark enabled" : "Watermark identity outputs"}
              </button>
            </div>
            {(exportQueued || watermarkEnabled) && (
              <p className="mt-3 text-xs text-white/50">
                {exportQueued && "Export job queued with normalized audio/fps. "}
                {watermarkEnabled && "Identity outputs will include a watermark overlay."}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">File bin</p>
              <button
                type="button"
                onClick={() => setUploadQueued(true)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
              >
                {uploadQueued ? "Upload queued" : "Upload media"}
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {assets.map((asset) => (
                <div key={asset.name} className="rounded-xl border border-white/10 bg-black/60 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">{asset.name}</p>
                    <span className="text-[11px] text-white/50">{asset.duration}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    {asset.type} · {asset.status}
                  </p>
                </div>
              ))}
            </div>
            {uploadQueued && (
              <p className="mt-3 text-xs text-white/50">
                Uploads route through the media ingest service for proxy generation.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm font-semibold">Audio dialogue</p>
            <p className="mt-1 text-xs text-white/50">
              Draft narration, record live, or queue a synthetic voice pass.
            </p>
            <textarea
              className="mt-3 h-24 w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-white/70"
              defaultValue="Narrator: The studio comes alive with the first take of the day."
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
              <label className="text-white/50" htmlFor="voice-select">
                Voice preset
              </label>
              <select
                id="voice-select"
                className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white/70"
                defaultValue={dialogues[0]?.voice}
              >
                {dialogues.map((dialogue) => (
                  <option key={dialogue.id} value={dialogue.voice}>
                    {dialogue.voice}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setVoiceQueued(true)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
              >
                {voiceQueued ? "Voice queued" : "Generate voiceover"}
              </button>
            </div>
            <div className="mt-3 space-y-2 text-xs text-white/60">
              {dialogues.map((dialogue) => (
                <div key={dialogue.id} className="rounded-lg border border-white/10 px-3 py-2">
                  <p className="text-white/70">{dialogue.script}</p>
                  <p className="mt-1 text-[11px] text-white/40">
                    {dialogue.voice} · {dialogue.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm font-semibold">AI provider routing</p>
            <p className="mt-1 text-xs text-white/50">
              Choose a free-tier provider for image/video generation and jump to their console.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
              <label className="text-white/50" htmlFor="provider-select">
                Provider
              </label>
              <select
                id="provider-select"
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
            <div className="mt-3 space-y-2 text-xs text-white/60">
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
        </div>
      </div>
    </section>
  );
}
