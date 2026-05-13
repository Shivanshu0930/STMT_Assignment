import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        graphite: "#1f2937",
        line: "#d9dee8",
        surface: "#f6f7f9",
        panel: "#ffffff",
        teal: "#00a895",
        mint: "#d8fff8",
        amber: "#f59e0b",
        rose: "#e11d48"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(16, 24, 40, 0.08)"
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Segoe UI Variable",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ],
        display: [
          "ui-rounded",
          "SF Pro Rounded",
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Segoe UI Variable",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ],
        mono: [
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      }
    }
  },
  plugins: []
} satisfies Config;
