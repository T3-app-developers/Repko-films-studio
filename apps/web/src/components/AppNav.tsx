import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/assets", label: "Assets" },
  { href: "/jobs", label: "Jobs" },
  { href: "/timeline", label: "Timeline" },
  { href: "/ai/image", label: "AI Image" },
  { href: "/ai/video", label: "AI Video" },
  { href: "/cast", label: "Cast" },
];

export function AppNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 text-sm">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-white/10 px-4 py-2 text-white/70 transition hover:border-white/30 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
