import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });

const org = { id: "org_repko", name: "Repko Films" };
const projects = [
  {
    id: "proj_evergreen",
    orgId: org.id,
    name: "Evergreen: AI-Enhanced Trailer",
    description: "Prototype project",
    createdBy: "user_01",
    createdAt: new Date().toISOString(),
  },
];

const assets: Array<Record<string, unknown>> = [];
const jobs: Array<Record<string, unknown>> = [];
const timelines: Array<Record<string, unknown>> = [];
const cast: Array<Record<string, unknown>> = [];
const auditLogs: Array<Record<string, unknown>> = [];

const requireEditor = (role: string) => {
  if (role === "viewer") {
    const error = new Error("Insufficient permissions");
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  }
};

const recordAudit = (entry: Record<string, unknown>) => {
  auditLogs.push({
    id: `audit_${auditLogs.length + 1}`,
    orgId: org.id,
    projectId: entry.projectId,
    actorUserId: entry.actorUserId ?? "user_01",
    eventType: entry.eventType,
    entityType: entry.entityType,
    entityId: entry.entityId,
    payload: entry.payload ?? {},
    createdAt: new Date().toISOString(),
  });
};

fastify.get("/health", async () => ({ status: "ok" }));

fastify.get("/orgs", async () => [org]);

fastify.get("/projects", async () => projects);

fastify.post("/projects", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const body = request.body as { name?: string; description?: string };
  const project = {
    id: `proj_${projects.length + 1}`,
    orgId: org.id,
    name: body.name ?? "Untitled Project",
    description: body.description ?? "",
    createdBy: "user_01",
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  return project;
});

fastify.get("/assets", async () => assets);

fastify.post("/assets", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const body = request.body as { projectId?: string; type?: string; originalUrl?: string };
  const asset = {
    id: `asset_${assets.length + 1}`,
    projectId: body.projectId ?? projects[0]?.id,
    type: body.type ?? "video",
    originalUrl: body.originalUrl ?? "s3://repko/originals/file.mov",
    createdAt: new Date().toISOString(),
  };
  assets.push(asset);
  return asset;
});

fastify.get("/jobs", async () => jobs);

fastify.post("/jobs", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const body = request.body as { projectId?: string; type?: string; inputRefs?: Record<string, unknown> };
  const job = {
    id: `job_${jobs.length + 1}`,
    projectId: body.projectId ?? projects[0]?.id,
    type: body.type ?? "proxy_generate",
    status: "queued",
    inputRefs: body.inputRefs ?? {},
    outputAssetIds: [],
    logs: "Queued",
    createdBy: "user_01",
    createdAt: new Date().toISOString(),
  };
  jobs.push(job);
  return job;
});

fastify.get("/jobs/:id", async (request) => {
  const params = request.params as { id: string };
  return jobs.find((job) => job.id === params.id);
});

fastify.post("/jobs/:id/retry", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const params = request.params as { id: string };
  const job = jobs.find((item) => item.id === params.id);
  if (job) {
    job.status = "queued";
    job.logs = "Retry requested";
  }
  return job;
});

fastify.get("/timeline", async () => timelines);

fastify.post("/timeline", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const body = request.body as { projectId?: string; clips?: Array<Record<string, unknown>> };
  const timeline = {
    id: `timeline_${timelines.length + 1}`,
    projectId: body.projectId ?? projects[0]?.id,
    clips: body.clips ?? [],
    exportSettings: { watermark: true },
  };
  timelines.push(timeline);
  return timeline;
});

fastify.get("/cast", async () => cast);

fastify.post("/cast", async (request) => {
  const role = request.headers["x-role"] ?? "editor";
  requireEditor(String(role));
  const body = request.body as { projectId?: string; name?: string; consentAttestation?: boolean };
  const castMember = {
    id: `cast_${cast.length + 1}`,
    projectId: body.projectId ?? projects[0]?.id,
    name: body.name ?? "New Cast",
    consentAttestation: Boolean(body.consentAttestation),
    consentTimestamp: body.consentAttestation ? new Date().toISOString() : null,
    consentUserId: body.consentAttestation ? "user_01" : null,
    referenceAssetIds: [],
  };
  cast.push(castMember);
  recordAudit({
    projectId: castMember.projectId,
    eventType: "cast_created",
    entityType: "CastMember",
    entityId: castMember.id,
  });
  return castMember;
});

fastify.get("/audit", async () => auditLogs);

fastify.setErrorHandler((error, _request, reply) => {
  const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
  reply.status(statusCode).send({ error: error.message });
});

const port = Number(process.env.PORT ?? 4000);

fastify.listen({ port, host: "0.0.0.0" });
