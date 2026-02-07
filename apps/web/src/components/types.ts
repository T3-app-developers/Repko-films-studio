export type JobStatus = "queued" | "running" | "succeeded" | "failed";

export type Job = {
  id: string;
  type: string;
  status: JobStatus;
  detail: string;
};

export type Asset = {
  name: string;
  type: string;
  meta: string;
  status: string;
};

export type TimelineClip = {
  name: string;
  duration: string;
  trim: string;
};

export type CastMember = {
  name: string;
  consent: string;
  refs: number;
};
