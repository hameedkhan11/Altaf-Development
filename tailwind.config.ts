import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-poppins)', "sans-serif"],
        heading: ['Optima', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
