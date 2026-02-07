import type { CastMember } from "./types";

export type CastPanelProps = {
  cast: CastMember[];
  helperText: string;
};

export function CastPanel({ cast, helperText }: CastPanelProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <h3 className="text-lg font-semibold">Cast & consent</h3>
      <p className="mt-2 text-xs text-white/50">{helperText}</p>
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
    </section>
  );
}
