import { JobQueue } from "../../components/JobQueue";
import type { Job } from "../../components/types";

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
  {
    id: "job_8294",
    type: "video_enhance",
    status: "failed",
    detail: "Color pass failed · retry available",
  },
];

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Jobs</p>
        <h2 className="mt-2 text-2xl font-semibold">Async processing queue</h2>
        <p className="mt-2 text-sm text-white/70">
          Track long-running FFmpeg and AI jobs with logs, retries, and outputs.
        </p>
      </header>
      <JobQueue jobs={jobs} helperText="Retries and logs are available per job." />
    </div>
  );
}
