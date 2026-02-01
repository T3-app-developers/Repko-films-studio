import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "repko-charcoal": "#111827",
        "repko-slate": "#1f2937",
        "repko-amber": "#f59e0b",
      },
    },
  },
  plugins: [],
};

export default config;
