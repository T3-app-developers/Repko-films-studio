import type { Asset } from "./types";

export type AssetListProps = {
  assets: Asset[];
  helperText: string;
  badgeText: string;
};

export function AssetList({ assets, helperText, badgeText }: AssetListProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Assets & uploads</h3>
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
          {badgeText}
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
        {helperText}
      </div>
    </section>
  );
}
