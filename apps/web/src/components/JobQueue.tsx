import type { Job } from "./types";

export type JobQueueProps = {
  jobs: Job[];
  helperText: string;
};

export function JobQueue({ jobs, helperText }: JobQueueProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <h3 className="text-lg font-semibold">Job queue</h3>
      <p className="mt-2 text-xs text-white/50">{helperText}</p>
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
    </section>
  );
}
