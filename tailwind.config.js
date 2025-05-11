/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tokyo-bg': '#1a1b26',
        'tokyo-bg-light': '#24283b',
        'tokyo-fg': '#a9b1d6',
        'tokyo-comment': '#565f89',
        'tokyo-blue': '#7aa2f7',
        'tokyo-green': '#9ece6a',
        'tokyo-red': '#f7768e',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}; 