import { CastPanel } from "../../components/CastPanel";
import type { CastMember } from "../../components/types";

const cast: CastMember[] = [
  { name: "Avery Monroe", consent: "Granted", refs: 3 },
  { name: "Jordan Lee", consent: "Pending", refs: 1 },
  { name: "Riley Santos", consent: "Granted", refs: 2 },
];

export default function CastPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Cast</p>
        <h2 className="mt-2 text-2xl font-semibold">Consent + audit</h2>
        <p className="mt-2 text-sm text-white/70">
          Track references, consent status, and policy-gated identity workflows.
        </p>
      </header>
      <CastPanel cast={cast} helperText="Identity jobs require consent + admin flag." />
    </div>
  );
}
