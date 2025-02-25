/**
 * Tailwind CSS configuration file
 * Configures:
 * - Content paths for Tailwind to scan
 * - Theme customization including colors
 * - Plugin integration (DaisyUI)
 * - Responsive breakpoints and other utilities
 */

import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-geist)'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;
