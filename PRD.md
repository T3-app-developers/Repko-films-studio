# Repko Films Studio — Product Requirements Document (PRD)

**Document version:** 1.0  
**Owner:** Product Lead (Producer)  
**Date:** 2026-01-31  
**Product name:** Repko Films Studio  
**Product type:** Web app (studio-grade AI-assisted media production pipeline)

---

## 1) Executive summary

Repko Films Studio is a web-based production workspace that combines:

- Project + asset management (upload, organize, review)
- Reliable media pipeline (proxy generation, metadata extraction, stitching, export)
- AI capabilities as asynchronous jobs (image generation, video generation/enhancement)
- Cast management (reference images + consent + audit)
- A minimal timeline editor for assembling clips and exporting deliverables

**V1 strategy:** be a dependable orchestrator of proven AI and media tools behind a unified workflow. Reliability of ingest → proxy → assemble → export comes **before** advanced identity features.

---

## 2) Problem statement

AI tools for image/video creation exist, but studios struggle to use them because:

- Tools are fragmented and do not share a common asset library or workflow.
- Video processing is fragile (formats, codecs, audio drift, frame rate issues).
- AI actions are slow, expensive, and fail without good job orchestration and logging.
- Identity/cast usage introduces legal, privacy, and misuse risks.

Repko Films needs a controlled environment that’s usable in real production: traceable outputs, permissions, repeatable exports, and a coherent end-to-end workflow.

---

## 3) Goals and non-goals

### 3.1 Goals (V1)

1. Provide a project-based workspace with role-based access.
2. Support reliable large media uploads to object storage.
3. Automatically generate video proxies, thumbnails, and metadata.
4. Provide a job system for long-running processing and AI tasks (retryable, logged).
5. Provide a minimal timeline editor (order clips, trim in/out, export).
6. Provide AI image generation and AI video generation/enhancement as plug-in providers.
7. Provide cast management with explicit consent attestation and audit logging.
8. Support watermarking and strict gating for identity-related actions.

### 3.2 Non-goals (explicitly out of scope for V1)

- Training or fine-tuning proprietary foundation models
- Building a fully featured professional NLE (multi-track audio, keyframes, etc.)
- Real-time collaborative editing (Google Docs style)
- Native mobile apps
- Public marketplace / external user self-serve onboarding at scale

---

## 4) Success metrics (MVP definition)

### 4.1 Functional “MVP complete” checklist

MVP is complete when users can:

- Create a project and invite collaborators with roles
- Upload large video files reliably (resumable/chunked)
- See playable proxies and metadata
- Generate AI images and AI video clips as jobs (with job status + logs)
- Assemble a timeline from clips, trim, and export a final MP4
- Create cast profiles, attach reference images, record consent, and generate audit logs
- See all jobs and exports tracked in a job list with errors visible

### 4.2 Reliability + quality targets

- **Export success rate:** ≥ 95% across supported formats  
- **Proxy availability:** proxy created for ≥ 98% of ingested supported videos  
- **Proxy playback:** first frame within 2 seconds on typical broadband  
- **Security:** 0 provider API keys exposed to browser storage or client code  
- **Traceability:** every AI/FFmpeg action produces a Job record and stored logs

---

## 5) Users, roles, and permissions

### 5.1 Primary users

- Producers and creative operators
- Editors/post staff
- Admin/ops

### 5.2 Roles

**Admin**
- Manage organization and members
- Enable/disable feature flags (especially identity)
- View and export audit logs
- Control retention rules, rate limits, and usage oversight

**Editor**
- Create and manage projects (within org permissions)
- Upload assets
- Create timelines and exports
- Run AI jobs (subject to rate limits and permissions)
- Create and manage cast profiles (subject to policy)

**Viewer**
- View projects and assets
- View job outputs
- (Optional V1) Add comments/notes on outputs

### 5.3 Permission rules (V1)

- Viewers cannot upload or create jobs.
- Editors can create jobs, exports, and cast profiles.
- Identity-related jobs require **both**:
  - cast consent attestation = true
  - org-level feature flag enabled by Admin

---

## 6) Core workflows and acceptance criteria

### 6.1 Workflow A — Create project

**Steps**
1. User signs in
2. User creates a project under an organization
3. User adds collaborators + roles

**Acceptance criteria**
- Project appears in dashboard immediately
- Role enforcement works (viewer cannot upload or create jobs)

---

### 6.2 Workflow B — Upload assets and generate proxies

**Steps**
1. Editor uploads video/image/audio to a project
2. Asset is stored in object storage as the original
3. A “proxy generation” job starts automatically for videos
4. UI shows upload progress and job status
5. Proxy becomes playable in browser when complete

**Requirements**
- Chunked/resumable upload for large files
- Virus/malware scanning (recommended; can be phase 2 if needed)
- Metadata extraction using ffprobe
- Proxy generation using FFmpeg

**Acceptance criteria**
- Upload a 500MB+ video reliably
- Proxy video plays in app
- Metadata visible: duration, fps, resolution, audio channels, codec
- Thumbnails generated

---

### 6.3 Workflow C — Job system visibility and reliability

**Steps**
1. User triggers a job (AI or media processing)
2. Job enters a queue
3. Worker executes job with progress updates
4. Job output is saved as new assets
5. Logs are available for debugging

**Acceptance criteria**
- Every job has status: queued, running, succeeded, failed, canceled
- Failed jobs show logs and “retry” action (editor/admin)
- Job outputs are linked to assets and project

---

### 6.4 Workflow D — Timeline assembly and export

**Steps**
1. Editor selects video assets (or AI-generated clips)
2. Orders clips and optionally trims in/out
3. Requests export with settings (resolution, watermark)
4. Worker normalizes fps/audio and stitches clips
5. Export stored as “export asset” and downloadable

**Requirements**
- Server-side render/export
- Concatenation with audio normalization and frame rate consistency
- Watermark option for outputs (especially identity features)

**Acceptance criteria**
- Export produces a playable MP4
- Export is saved as an asset with metadata
- Export job shows logs; errors understandable

---

### 6.5 Workflow E — Cast management (rights + audit)

**Steps**
1. Editor creates cast member profile
2. Uploads one or more reference images
3. Completes consent attestation (checkbox + timestamp + user)
4. System records audit logs for all cast modifications

**Requirements**
- Consent attestation required before identity-related jobs
- Immutable audit log entries for:
  - cast created/updated
  - consent submitted
  - identity jobs requested/run

**Acceptance criteria**
- Attempting identity job without consent is blocked with clear messaging
- Admin can view audit log entries

---

### 6.6 Workflow F — AI image generation tab

**Steps**
1. User enters prompt + selects preset
2. Creates generation job
3. Job runs through provider
4. Output image saved as asset

**Requirements**
- Provider abstraction layer (no hardcoded vendor)
- Safety layer hooks (moderation, disallowed content filters)
- Mock provider for local development

**Acceptance criteria**
- Job completes and saves output image asset
- Parameters and prompt stored in job record (subject to redaction policy)
- UI shows results gallery

---

### 6.7 Workflow G — AI video generation/enhancement tab

**Steps**
1. User enters prompt or selects a video asset to enhance
2. Creates a job (generateShot or enhanceVideo)
3. Output saved as video asset usable in timeline

**Acceptance criteria**
- Generated/enhanced video becomes playable
- Output is compatible with timeline/export pipeline

---

### 6.8 Workflow H — Identity/cast insertion (guarded)

**V1 approach:** start with safer, limited transformations (e.g., still-image identity conditioning). Video identity insertion is feature-flagged and may be deferred depending on risk and stability.

**Hard requirements**
- Must require consent attestation
- Must be behind admin feature flag
- Must log full audit trail
- Watermark option recommended

**Acceptance criteria**
- Identity jobs cannot run unless policy constraints are satisfied
- Outputs are traceable to inputs + cast profile

---

## 7) Product scope by milestone (build order)

### Milestone 1 — Auth + orgs + projects
- Sign-in
- Org membership and roles
- Project CRUD
- Invitation flows (can be simplified for internal use)

### Milestone 2 — Asset upload + storage + proxy generation
- Chunked uploads
- Object storage originals
- Worker-based proxy + thumbnails + metadata extraction

### Milestone 3 — Job system + UI
- Create job endpoint + job list
- Status updates + logs
- Retries with exponential backoff for safe failure types

### Milestone 4 — Timeline + export
- Minimal timeline editor
- Stitch/export pipeline
- Export saved back to assets

### Milestone 5 — Cast management + consent + audit
- Cast profiles
- Reference image uploads
- Consent attestation record
- Audit log viewer for admins

### Milestone 6 — AI image generation (provider abstraction)
- Image provider interface
- Mock provider (local)
- Configurable provider selection

### Milestone 7 — AI video generation/enhancement (provider abstraction)
- Video provider interface
- Mock provider
- Feature flags per capability

### Milestone 8 — Identity features (guarded and limited)
- Identity provider interface
- Strict policy enforcement
- Watermarking + extra audit

---

## 8) Technical architecture requirements

### 8.1 High-level architecture

- **Web UI** (Next.js)  
- **API service** (Node/TS)  
- **Worker service** (Node/TS)  
- **Postgres** for metadata  
- **Redis** for BullMQ job queues  
- **Object storage** (S3-compatible; MinIO for local dev)  
- **FFmpeg** for media processing

### 8.2 Strict rule: secrets and keys

- Provider API keys are **server-side only**
- Use env variables + secrets manager in production
- Never store keys in localStorage, sessionStorage, client JS bundles, or database in plaintext
- Use signed URLs for direct-to-storage upload/download

### 8.3 Repository layout (required)

- `/apps/web` — Next.js frontend  
- `/apps/api` — backend REST API  
- `/apps/worker` — BullMQ workers (FFmpeg + AI calls)  
- `/packages/shared` — shared types, zod schemas  
- `/infra` — docker-compose (postgres, redis, minio)

### 8.4 Storage strategy

- Original media: object storage (bucket per env)
- Derived media (proxies, thumbnails, exports): object storage
- Metadata + relationships: Postgres
- Logs: stored in Postgres job table and/or log storage

### 8.5 Job queue strategy

- All processing is async via BullMQ
- Jobs are idempotent where possible
- Retries:
  - provider transient errors: retry with backoff
  - FFmpeg deterministic errors: fail fast with logs

---

## 9) Supported media formats (V1)

Define a strict support list to avoid endless edge cases.

### Ingest supported (recommended V1)
- Video containers: MP4, MOV
- Video codecs: H.264 (baseline/main/high)
- Audio: AAC

### Explicitly unsupported (reject with message)
- Variable frame rate sources (or normalize immediately)
- Exotic codecs (AV1, ProRes) unless intentionally supported
- Multi-stream oddities without a tested path

**Requirement:** if you accept additional formats, you must specify the exact normalization pipeline and test it.

---

## 10) Data model requirements (minimum viable)

### 10.1 Tables (conceptual)

**User**
- id, email, name
- org_id, role
- created_at

**Organization**
- id, name

**Project**
- id, org_id
- name, description
- created_by, created_at

**Asset**
- id, project_id
- type: video | image | audio | export
- original_url
- proxy_url (video)
- thumbnail_url
- metadata_json (duration, fps, resolution, codecs, etc.)
- created_at

**CastMember**
- id, project_id (or org_id depending on desired sharing)
- name, notes
- reference_asset_ids[]
- consent_attestation: boolean
- consent_timestamp
- consent_user_id

**Job**
- id, project_id
- type: proxy_generate | export_render | image_generate | video_generate | video_enhance | identity_apply
- status: queued | running | succeeded | failed | canceled
- input_refs_json
- output_asset_ids[]
- logs_text
- provider_name
- estimated_cost, provider_cost
- created_by, created_at

**Timeline**
- id, project_id
- clips_json (ordered list of asset ids + trims)
- export_settings_json

**AuditLog**
- id, org_id, project_id
- actor_user_id
- event_type
- entity_type, entity_id
- payload_json
- created_at

---

## 11) AI provider abstraction requirements

### 11.1 Provider interfaces (required)

**ImageProvider**
- `generateImage(prompt, preset, aspectRatio, seed?, negativePrompt?) -> outputAsset`

**VideoProvider**
- `generateShot(prompt, durationSec, aspectRatio, fps?, seed?) -> outputAsset`
- `enhanceVideo(inputAssetId, operation, params) -> outputAsset`

**IdentityProvider** (guarded)
- `applyIdentity(castMemberId, inputAssetId, params) -> outputAsset`

### 11.2 Provider selection

- Configurable by environment variables
- Default to `MockProvider` in local dev
- Support feature flags per capability (image/video/identity)

### 11.3 Safety hooks

- Before submitting prompts or identity actions:
  - enforce policy checks
  - optionally run moderation endpoint
  - block disallowed operations

---

## 12) Security, privacy, and policy requirements

### 12.1 Mandatory security controls

- RBAC enforced on every endpoint
- Signed URLs for media access
- Audit logs for sensitive actions
- Rate limiting on job creation and export endpoints
- Input validation with shared schemas

### 12.2 Likeness/consent policy (V1 baseline)

- Every CastMember must record:
  - explicit consent attestation (checkbox)
  - timestamp
  - actor user ID
- Identity transformations require:
  - consent attestation = true
  - admin feature flag enabled
- Provide watermark option for outputs related to identity

### 12.3 Retention and deletion (recommended)

- Define retention policy:
  - originals
  - derived assets
  - logs
- Provide ability to delete project and all associated assets (admin only)

---

## 13) UX requirements (V1)

### 13.1 Navigation

- Organization selector (if multiple)
- Project dashboard
- Within a project:
  - Assets
  - Jobs
  - Timeline/Export
  - Tabs: AI Image, AI Video, Cast

### 13.2 Job UX

- Jobs list with filters (status, type)
- Per-job page showing:
  - inputs
  - outputs
  - logs (FFmpeg stderr included)
  - retry button (editor/admin)

### 13.3 Upload UX

- Drag/drop + file picker
- Progress + resumable indicator
- Clear errors when formats unsupported

---

## 14) API requirements (high-level)

### 14.1 Core endpoints (illustrative)

- `POST /auth/...` (framework dependent)
- `GET/POST /orgs`
- `GET/POST /projects`
- `GET/POST /assets`
- `POST /assets/upload/initiate` (signed URL)
- `POST /assets/upload/complete`
- `GET /jobs`
- `POST /jobs`
- `GET /jobs/:id`
- `POST /jobs/:id/retry`
- `GET/POST /timeline`
- `POST /exports` (creates export job)
- `GET/POST /cast`
- `GET /audit` (admin)

---

## 15) Testing and QA requirements

Minimum required tests before MVP ship:

- Upload integration test (signed URL flow)
- Proxy generation job test (known input -> known outputs)
- Export job test (2–3 sample clips)
- RBAC tests (viewer blocked from upload/jobs)
- Audit log creation for cast + identity job attempt
- Regression fixtures for FFmpeg pipelines

---

## 16) Observability requirements

- Structured logs for API and worker
- Job logs persisted and viewable in UI
- Metrics (minimum):
  - job success/fail rates by type
  - average job duration
  - export success rate
  - provider error rates

---

## 17) Risks and mitigations

### Risk: Media format chaos breaks exports
Mitigation: strict supported format list + proxy normalization pipeline + clear rejection messaging.

### Risk: Identity features create legal/safety exposure
Mitigation: consent gating + admin feature flag + audit logs + watermark options + clear acceptable use policy.

### Risk: AI provider instability and costs
Mitigation: provider abstraction + retries/backoff + usage limits + cost fields per job + ability to swap providers.

### Risk: Building “AI magic buttons” before workflow reliability
Mitigation: milestone sequencing—do not ship identity/video AI features before ingest/export is stable.

---

## 18) Definition of done (MVP)

MVP is “done” when:

- The app supports end-to-end workflow:
  - upload → proxy → AI generate → timeline → export
- All long-running tasks are jobs with visible status and logs
- Role permissions are enforced and tested
- Cast consent and audit logs exist and are enforced for identity operations
- No provider keys are exposed client-side
- Local development environment runs via docker-compose

---

## Appendix A — Coding-agent build instructions (implementation blueprint)

This section is designed to be pasted into a coding agent as the build plan.

### A1) Required tech stack

- Frontend: Next.js + TypeScript + Tailwind + React Query
- Backend: Node.js + TypeScript + Fastify (or NestJS; choose one)
- DB: Postgres + Prisma
- Queue: BullMQ + Redis
- Object storage: S3-compatible (MinIO local)
- Media: FFmpeg in worker container

### A2) Repository structure

- `/apps/web`
- `/apps/api`
- `/apps/worker`
- `/packages/shared`
- `/infra/docker-compose.yml`

### A3) Build milestones and acceptance tests

**Milestone 1: Auth + Projects**
- Create org/projects, invite users, enforce roles
- Acceptance: viewer cannot upload or create jobs

**Milestone 2: Upload + Storage + Proxy**
- Chunked uploads, store originals in S3/MinIO
- Worker generates proxy + thumbnail + metadata
- Acceptance: upload 500MB video, proxy playable, metadata displayed

**Milestone 3: Job system + UI**
- POST /jobs and GET /jobs/:id
- UI shows job queue and logs
- Acceptance: proxy job appears; failures show logs

**Milestone 4: Timeline + Export**
- Minimal timeline editor with ordering + trims
- Export job stitches clips with normalized fps/audio
- Acceptance: playable MP4 export saved as asset

**Milestone 5: Cast + Consent + Audit**
- Cast CRUD, reference images, consent attestation
- Block identity jobs without consent
- Acceptance: identity job attempt without consent is blocked + logged

**Milestone 6: AI Image Generation**
- Provider interface + MockProvider
- Generate -> save as asset
- Acceptance: job output appears in asset library

**Milestone 7: AI Video Generation/Enhancement**
- Provider interface + MockProvider
- Output usable in timeline
- Acceptance: generated clip exportable in timeline

**Milestone 8: Identity (guarded)**
- Feature flag + strict gating + audit + optional watermark
- Prefer still-image identity conditioning first
- Acceptance: only admin can enable; outputs traceable

### A4) Stop conditions

- Do not implement custom ML training in V1.
- Do not store provider keys in browser.
- Do not build complex multi-track NLE features in V1.
