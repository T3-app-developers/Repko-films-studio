import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Repko Films Studio",
  description: "Studio-grade AI-assisted media production pipeline",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-repko-charcoal text-white">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-white/10 bg-repko-slate/60">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Repko Films Studio
                </p>
                <h1 className="text-xl font-semibold">Production Control Room</h1>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/20 px-3 py-1">Org: Repko</span>
                <span className="rounded-full border border-white/20 px-3 py-1">Role: Editor</span>
              </div>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
          <footer className="border-t border-white/10 py-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-white/50">
              <span>Prototype only — not production ready.</span>
              <span>Build v0.1</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
