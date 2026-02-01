import { z } from "zod";

export const RoleSchema = z.enum(["admin", "editor", "viewer"]);
export type Role = z.infer<typeof RoleSchema>;

export const JobStatusSchema = z.enum([
  "queued",
  "running",
  "succeeded",
  "failed",
  "canceled",
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const AssetTypeSchema = z.enum(["video", "image", "audio", "export"]);
export type AssetType = z.infer<typeof AssetTypeSchema>;

export const JobTypeSchema = z.enum([
  "proxy_generate",
  "export_render",
  "image_generate",
  "video_generate",
  "video_enhance",
  "identity_apply",
]);
export type JobType = z.infer<typeof JobTypeSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const AssetSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  type: AssetTypeSchema,
  originalUrl: z.string(),
  proxyUrl: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string(),
});
export type Asset = z.infer<typeof AssetSchema>;

export const JobSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  type: JobTypeSchema,
  status: JobStatusSchema,
  inputRefs: z.record(z.string(), z.unknown()).optional(),
  outputAssetIds: z.array(z.string()).default([]),
  logs: z.string().optional(),
  providerName: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
});
export type Job = z.infer<typeof JobSchema>;

export const CastMemberSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  notes: z.string().optional(),
  referenceAssetIds: z.array(z.string()).default([]),
  consentAttestation: z.boolean(),
  consentTimestamp: z.string().nullable().optional(),
  consentUserId: z.string().nullable().optional(),
});
export type CastMember = z.infer<typeof CastMemberSchema>;

export const AuditLogSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  projectId: z.string(),
  actorUserId: z.string(),
  eventType: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;
