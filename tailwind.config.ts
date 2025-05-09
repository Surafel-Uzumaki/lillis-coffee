// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          light: "#D7BFA6",
          accent: "#A67B5B",
          medium: "#8B5D33",
          dark: "#5D3A1A",
          darkest: "#3E2723",
          cream: "#F9F5F0",
        },
        fontFamily: {
          playfair: ['Playfair Display', 'serif'],
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
