import { TimelinePanel } from "../../components/TimelinePanel";
import type { AudioDialogue, TimelineAsset, TimelineClip } from "../../components/types";

const timelineClips: TimelineClip[] = [
  { name: "Scene_01", duration: "00:12", trim: "In 00:00 → Out 00:12" },
  { name: "AI_Bridge", duration: "00:08", trim: "In 00:02 → Out 00:10" },
  { name: "Scene_02", duration: "00:18", trim: "In 00:00 → Out 00:18" },
  { name: "Interview_Selects", duration: "00:24", trim: "In 00:05 → Out 00:29" },
];

const timelineAssets: TimelineAsset[] = [
  { name: "Lobby_Broll.mov", type: "Video", duration: "00:21", status: "Proxy ready" },
  { name: "Voiceover_take03.wav", type: "Audio", duration: "00:12", status: "Cleaned" },
  { name: "AI_Skyplate.png", type: "Still", duration: "Frame", status: "Approved" },
  { name: "Interview_A_cam.mov", type: "Video", duration: "01:14", status: "Sync pending" },
];

const audioDialogues: AudioDialogue[] = [
  {
    id: "dialogue-1",
    script: "Narrator: The team gathers for the first lighting pass.",
    voice: "Repko Neutral · Mid",
    duration: "00:08",
  },
  {
    id: "dialogue-2",
    script: "Director: Roll camera on cue three.",
    voice: "Repko Command · Warm",
    duration: "00:05",
  },
];

const providerOptions = [
  { label: "Google AI Studio (Imagen/Veo)", href: "https://aistudio.google.com/" },
  { label: "OpenAI Platform", href: "https://platform.openai.com/docs/guides/images" },
  { label: "Stability AI", href: "https://platform.stability.ai/" },
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
        assets={timelineAssets}
        dialogues={audioDialogues}
        providerOptions={providerOptions}
        helperText="Exports normalize FPS and audio before stitching. Uploads and AI providers route through backend services."
      />
    </div>
  );
}
