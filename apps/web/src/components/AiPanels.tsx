import Link from "next/link";

export type AiPanelsProps = {
  image: {
    preset: string;
    ratio: string;
    seed: string;
  };
  video: {
    mode: string;
    duration: string;
    fps: string;
  };
  audit: string[];
};

export function AiPanels({ image, video, audit }: AiPanelsProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
        <h3 className="text-lg font-semibold">AI image generation</h3>
        <p className="mt-2 text-xs text-white/50">Provider abstraction with safety hooks.</p>
        <div className="mt-4 space-y-2 text-xs text-white/60">
          <p>Preset: {image.preset}</p>
          <p>Aspect ratio: {image.ratio}</p>
          <p>Seed: {image.seed}</p>
        </div>
        <Link
          href="/ai/image"
          className="mt-4 inline-flex rounded-full bg-repko-amber px-4 py-2 text-xs font-semibold text-black"
        >
          Generate image
        </Link>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
        <h3 className="text-lg font-semibold">AI video generation</h3>
        <p className="mt-2 text-xs text-white/50">Generate or enhance footage.</p>
        <div className="mt-4 space-y-2 text-xs text-white/60">
          <p>Mode: {video.mode}</p>
          <p>Duration: {video.duration}</p>
          <p>FPS: {video.fps}</p>
        </div>
        <Link
          href="/ai/video"
          className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs text-white/70"
        >
          Queue video job
        </Link>
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
  );
}
