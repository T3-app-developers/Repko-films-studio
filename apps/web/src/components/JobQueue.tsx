"use client";

import { useState } from "react";

import type { Job } from "./types";

export type JobQueueProps = {
  jobs: Job[];
  helperText: string;
};

export function JobQueue({ jobs, helperText }: JobQueueProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const toggleLogs = (jobId: string) => {
    setExpandedJobId((current) => (current === jobId ? null : jobId));
  };

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
            <button
              type="button"
              onClick={() => toggleLogs(job.id)}
              className="mt-3 text-xs text-repko-amber"
              aria-expanded={expandedJobId === job.id}
            >
              {expandedJobId === job.id ? "Hide logs" : "View logs"} →
            </button>
            {expandedJobId === job.id && (
              <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Latest logs
                </p>
                <ul className="mt-2 space-y-1">
                  {job.logs.map((log) => (
                    <li key={log} className="font-mono">
                      {log}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
