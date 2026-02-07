"use client";

import { useState } from "react";

import type { TimelineClip } from "./types";

export type TimelinePanelProps = {
  clips: TimelineClip[];
  helperText: string;
};

export function TimelinePanel({ clips, helperText }: TimelinePanelProps) {
  const [exportQueued, setExportQueued] = useState(false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);

  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <h3 className="text-lg font-semibold">Timeline & export</h3>
      <p className="mt-2 text-xs text-white/50">{helperText}</p>
      <div className="mt-4 space-y-3">
        {clips.map((clip) => (
          <div key={clip.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium">{clip.name}</p>
            <p className="text-xs text-white/50">Duration {clip.duration}</p>
            <p className="text-xs text-white/50">{clip.trim}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
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
    </section>
  );
}
