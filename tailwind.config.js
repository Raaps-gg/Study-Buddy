/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'y2kblue': '#1493ff',
        'y2kgreen': '#7fff00',
        'y2kpink' : '#ff1493',
        'y2kpurple' : '8a2be2',
        background:  "#7fff00",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
