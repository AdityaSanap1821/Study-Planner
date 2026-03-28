/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F0D06",
        surface: "#1A1710",
        card: "#201E12",
        "card-hover": "#252210",
        border: "#2E2B1A",
        "border-hover": "#3D3920",
        amber: {
          DEFAULT: "#F59E0B",
          bright: "#FDB827",
          glow: "rgba(245,158,11,0.12)",
          dim: "#B87A08",
        },
        text: {
          DEFAULT: "#FEF3C7",
          muted: "#8C8060",
          dim: "#5C5840",
        },
        danger: {
          DEFAULT: "#EF4444",
          dim: "rgba(239,68,68,0.15)",
        },
        success: {
          DEFAULT: "#34D399",
          dim: "rgba(52,211,153,0.15)",
        },
        pri: {
          high: "#F87171",
          "high-bg": "rgba(248,113,113,0.12)",
          med: "#FBBF24",
          "med-bg": "rgba(251,191,36,0.12)",
          low: "#34D399",
          "low-bg": "rgba(52,211,153,0.12)",
        },
      },
      fontFamily: {
        head: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.4)",
        "amber-glow": "0 0 0 2px rgba(245,158,11,0.3)",
      },
    },
  },
  plugins: [],
};
