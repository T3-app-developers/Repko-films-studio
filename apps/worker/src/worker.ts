import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379");

const worker = new Worker(
  "repko-jobs",
  async (job) => {
    const { type } = job.data as { type?: string };

    if (type === "proxy_generate") {
      return { status: "proxy_complete", logs: "FFmpeg proxy generated" };
    }

    if (type === "export_render") {
      return { status: "export_complete", logs: "Export stitched" };
    }

    if (type === "image_generate") {
      return { status: "image_ready", logs: "Mock image generated" };
    }

    if (type === "video_generate") {
      return { status: "video_ready", logs: "Mock video generated" };
    }

    if (type === "identity_apply") {
      return { status: "identity_ready", logs: "Identity apply (mock)" };
    }

    return { status: "noop", logs: "No handler configured" };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`, job.returnvalue);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed`, error);
});
