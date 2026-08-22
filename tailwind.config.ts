import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EAD8",
        "cream-deep": "#EBD9B4",
        surface: "#FCF8EE",
        ink: "#241A12",
        muted: "#5C4A38",
        faint: "#8D7A63",
        line: "#DFCBA0",
        wine: "#7E2436",
        "wine-bright": "#A93752",
        "wine-deep": "#3A1018",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
