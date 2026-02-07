const modes = ["Generate shot", "Enhance footage", "Style transfer"];

const recentVideos = [
  {
    name: "Bridge insert",
    detail: "Mode: Generate shot · 6 sec · 24fps",
    status: "Running",
  },
  {
    name: "Interview cleanup",
    detail: "Mode: Enhance footage · Noise removal",
    status: "Queued",
  },
];

export default function AiVideoPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI Video</p>
        <h2 className="mt-2 text-2xl font-semibold">Generate + enhance clips</h2>
        <p className="mt-2 text-sm text-white/70">
          Submit video jobs through provider adapters with queue-based processing.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm font-semibold">Video job setup</p>
          <div className="mt-4 space-y-3 text-xs text-white/60">
            <div className="rounded-xl border border-white/10 bg-black/60 p-3">
              Slow push-in shot of the studio lobby, soft bloom, 35mm look.
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Modes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {modes.map((mode) => (
                  <span
                    key={mode}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/10 px-3 py-1">Duration: 6 sec</span>
              <span className="rounded-full border border-white/10 px-3 py-1">FPS: 24</span>
            </div>
          </div>
          <button className="mt-4 rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black">
            Create video job
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm font-semibold">Recent video jobs</p>
          <div className="mt-4 space-y-3 text-xs text-white/70">
            {recentVideos.map((item) => (
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
