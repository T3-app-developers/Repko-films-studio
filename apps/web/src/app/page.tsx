import { AiPanels } from "../components/AiPanels";
import { AssetList } from "../components/AssetList";
import { CastPanel } from "../components/CastPanel";
import { JobQueue } from "../components/JobQueue";
import { ProjectSummary } from "../components/ProjectSummary";
import { TimelinePanel } from "../components/TimelinePanel";
import type { Asset, CastMember, Job, TimelineClip } from "../components/types";

const jobs: Job[] = [
  {
    id: "job_8421",
    type: "proxy_generate",
    status: "running",
    detail: "Generating proxy for Forest_RoughCut.mov",
  },
  {
    id: "job_8399",
    type: "image_generate",
    status: "queued",
    detail: "Prompt: Golden hour establishing shot",
  },
  {
    id: "job_8330",
    type: "export_render",
    status: "succeeded",
    detail: "Export: Trailer_v3.mp4",
  },
];

const assets: Asset[] = [
  {
    name: "Forest_RoughCut.mov",
    type: "Video",
    meta: "4K · 24fps · 00:02:18",
    status: "Proxy 72%",
  },
  {
    name: "AI_Concept_Frame_07.png",
    type: "Image",
    meta: "2048×1152",
    status: "Ready",
  },
  {
    name: "Trailer_v3.mp4",
    type: "Export",
    meta: "1080p · 24fps · 00:01:12",
    status: "Delivered",
  },
];

const timelineClips: TimelineClip[] = [
  { name: "Scene_01", duration: "00:12", trim: "In 00:00 → Out 00:12" },
  { name: "AI_Bridge", duration: "00:08", trim: "In 00:02 → Out 00:10" },
  { name: "Scene_02", duration: "00:18", trim: "In 00:00 → Out 00:18" },
];

const cast: CastMember[] = [
  { name: "Avery Monroe", consent: "Granted", refs: 3 },
  { name: "Jordan Lee", consent: "Pending", refs: 1 },
];

const audit = [
  "Consent attested for Avery Monroe · 2 hours ago",
  "Identity job blocked (consent missing) · 4 hours ago",
  "Admin enabled AI video provider · 1 day ago",
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectSummary
        title="Evergreen: AI-Enhanced Trailer"
        description="End-to-end workflow dashboard for ingest, jobs, timeline assembly, and export."
        cta={[
          { label: "New Job", variant: "primary" },
          { label: "Upload Assets", variant: "secondary" },
          { label: "Invite Collaborators", variant: "secondary" },
        ]}
        stats={[
          { label: "Proxy availability", value: "98%", footnote: "Target reliability" },
          { label: "Exports", value: "12", footnote: "95% success rate" },
          { label: "AI Jobs", value: "6 running", footnote: "Queued + running" },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AssetList
          assets={assets}
          badgeText="Chunked upload enabled"
          helperText="Drag + drop files here. Supported: MP4, MOV, H.264, AAC."
        />
        <JobQueue jobs={jobs} helperText="All AI + media processing is async with logs." />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <TimelinePanel
          clips={timelineClips}
          helperText="Order clips, trim in/out, and export with watermarking."
        />
        <CastPanel
          cast={cast}
          helperText="Identity jobs require consent + admin feature flag."
        />
      </section>

      <AiPanels
        image={{ preset: "Cinematic still", ratio: "16:9", seed: "30211" }}
        video={{ mode: "Generate shot", duration: "6 sec", fps: "24" }}
        audit={audit}
      />
    </div>
  );
}
