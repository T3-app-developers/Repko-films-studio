const jobs = [
  {
    id: "job_8421",
    type: "proxy_generate",
    status: "running",
    detail: "Generating proxy for " + "Forest_RoughCut.mov",
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

const assets = [
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

const timelineClips = [
  { name: "Scene_01", duration: "00:12", trim: "In 00:00 → Out 00:12" },
  { name: "AI_Bridge", duration: "00:08", trim: "In 00:02 → Out 00:10" },
  { name: "Scene_02", duration: "00:18", trim: "In 00:00 → Out 00:18" },
];

const cast = [
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
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-repko-slate/80 to-black/40 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Project</p>
            <h2 className="text-2xl font-semibold">Evergreen: AI-Enhanced Trailer</h2>
            <p className="mt-2 text-sm text-white/70">
              End-to-end workflow dashboard for ingest, jobs, timeline assembly, and export.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-repko-amber px-4 py-2 text-sm font-semibold text-black">
              New Job
            </button>
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              Upload Assets
            </button>
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              Invite Collaborators
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-white/60">Proxy availability</p>
            <p className="mt-2 text-2xl font-semibold">98%</p>
            <p className="text-xs text-white/40">Target reliability</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-white/60">Exports</p>
            <p className="mt-2 text-2xl font-semibold">12</p>
            <p className="text-xs text-white/40">95% success rate</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-white/60">AI Jobs</p>
            <p className="mt-2 text-2xl font-semibold">6 running</p>
            <p className="text-xs text-white/40">Queued + running</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Assets & uploads</h3>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
              Chunked upload enabled
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {assets.map((asset) => (
              <div
                key={asset.name}
                className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-xs text-white/50">
                    {asset.type} · {asset.meta}
                  </p>
                </div>
                <span className="text-xs text-white/70">{asset.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-white/20 p-4 text-center text-sm text-white/60">
            Drag + drop files here. Supported: MP4, MOV, H.264, AAC.
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">Job queue</h3>
          <p className="mt-2 text-xs text-white/50">All AI + media processing is async with logs.</p>
          <div className="mt-4 space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{job.type}</p>
                  <span className="text-xs text-white/60">{job.status}</span>
                </div>
                <p className="mt-2 text-xs text-white/50">{job.detail}</p>
                <button className="mt-3 text-xs text-repko-amber">View logs →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">Timeline & export</h3>
          <p className="mt-2 text-xs text-white/50">Order clips, trim in/out, and export with watermarking.</p>
          <div className="mt-4 space-y-3">
            {timelineClips.map((clip) => (
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
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">Cast & consent</h3>
          <p className="mt-2 text-xs text-white/50">
            Identity jobs require consent + admin feature flag.
          </p>
          <div className="mt-4 space-y-3">
            {cast.map((member) => (
              <div key={member.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{member.name}</p>
                  <span className="text-xs text-white/60">{member.consent}</span>
                </div>
                <p className="text-xs text-white/50">Reference images: {member.refs}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white/70">
            Add cast member
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">AI image generation</h3>
          <p className="mt-2 text-xs text-white/50">Provider abstraction with safety hooks.</p>
          <div className="mt-4 space-y-2 text-xs text-white/60">
            <p>Preset: Cinematic still</p>
            <p>Aspect ratio: 16:9</p>
            <p>Seed: 30211</p>
          </div>
          <button className="mt-4 rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black">
            Generate image
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">AI video generation</h3>
          <p className="mt-2 text-xs text-white/50">Generate or enhance footage.</p>
          <div className="mt-4 space-y-2 text-xs text-white/60">
            <p>Mode: Generate shot</p>
            <p>Duration: 6 sec</p>
            <p>FPS: 24</p>
          </div>
          <button className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white/70">
            Queue video job
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold">Audit & policy</h3>
          <p className="mt-2 text-xs text-white/50">Immutable audit trails for sensitive actions.</p>
          <ul className="mt-4 space-y-2 text-xs text-white/60">
            {audit.map((entry) => (
              <li key={entry} className="rounded-lg border border-white/10 bg-white/5 p-2">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
