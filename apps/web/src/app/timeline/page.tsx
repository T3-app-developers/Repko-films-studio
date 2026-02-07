import { TimelinePanel } from "../../components/TimelinePanel";
import type { TimelineClip } from "../../components/types";

const timelineClips: TimelineClip[] = [
  { name: "Scene_01", duration: "00:12", trim: "In 00:00 → Out 00:12" },
  { name: "AI_Bridge", duration: "00:08", trim: "In 00:02 → Out 00:10" },
  { name: "Scene_02", duration: "00:18", trim: "In 00:00 → Out 00:18" },
  { name: "Interview_Selects", duration: "00:24", trim: "In 00:05 → Out 00:29" },
];

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Timeline</p>
        <h2 className="mt-2 text-2xl font-semibold">Assemble + export</h2>
        <p className="mt-2 text-sm text-white/70">
          Arrange clips, trim in/out points, and submit exports with watermarking options.
        </p>
      </header>
      <TimelinePanel
        clips={timelineClips}
        helperText="Exports normalize FPS and audio before stitching."
      />
    </div>
  );
}
