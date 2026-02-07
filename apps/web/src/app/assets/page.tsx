import { AssetList } from "../../components/AssetList";
import type { Asset } from "../../components/types";

const assets: Asset[] = [
  {
    name: "Forest_RoughCut.mov",
    type: "Video",
    meta: "4K · 24fps · 00:02:18",
    status: "Proxy 72%",
  },
  {
    name: "A-Roll_Interview.mov",
    type: "Video",
    meta: "4K · 24fps · 00:05:12",
    status: "Proxy ready",
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

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Assets</p>
        <h2 className="mt-2 text-2xl font-semibold">Ingest + library</h2>
        <p className="mt-2 text-sm text-white/70">
          Manage originals, proxies, and exports with resumable uploads and metadata tracking.
        </p>
      </header>
      <AssetList
        assets={assets}
        badgeText="Resumable uploads active"
        helperText="Upload MP4/MOV files. Proxies and thumbnails generate automatically."
      />
    </div>
  );
}
