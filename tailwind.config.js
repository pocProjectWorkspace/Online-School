/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B1628',
        'bg-secondary': '#112040',
        'bg-card': '#1A2E50',
        'bg-card-hover': '#1F3560',
        'accent-blue': '#2D7DD2',
        'accent-cyan': '#00D4FF',
        'accent-purple': '#7B5CF0',
        'accent-green': '#00E5A0',
        'accent-amber': '#FFB800',
        'accent-red': '#FF4757',
        'text-secondary': '#A8BFDA',
        'text-muted': '#5A7399',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
