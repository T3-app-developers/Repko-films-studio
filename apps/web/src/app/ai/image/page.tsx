const presets = [
  "Cinematic still",
  "Product hero",
  "Storyboard frame",
  "Moody monochrome",
];

const recentGenerations = [
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
          <button className="mt-4 rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black">
            Create image job
          </button>
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
