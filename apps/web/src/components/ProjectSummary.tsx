import Link from "next/link";

export type ProjectSummaryProps = {
  title: string;
  description: string;
  stats: Array<{ label: string; value: string; footnote: string }>;
  cta: Array<{ label: string; variant: "primary" | "secondary"; href: string }>;
};

export function ProjectSummary({ title, description, stats, cta }: ProjectSummaryProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-repko-slate/80 to-black/40 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Project</p>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-white/70">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {cta.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "rounded-full bg-repko-amber px-4 py-2 text-sm font-semibold text-black"
                  : "rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-white/60">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-white/40">{stat.footnote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
