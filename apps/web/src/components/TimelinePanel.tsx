import type { TimelineClip } from "./types";

export type TimelinePanelProps = {
  clips: TimelineClip[];
  helperText: string;
};

export function TimelinePanel({ clips, helperText }: TimelinePanelProps) {
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
        <button className="rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black">
          Export MP4
        </button>
        <button className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/70">
          Watermark identity outputs
        </button>
      </div>
    </section>
  );
}
