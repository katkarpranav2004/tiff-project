/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "foundation-green": "#133324",
        "foundation-dark": "#0C2318",
        "institutional-slate": "#0F2D1F",
        "heritage-sage": "#2D5A43",
        "forest-leaf": "#245037",
        "brand-green": "#6ab43e",
        "status-verified": "#39b54a",
        "warm-ivory": "#FDFBF7",
        "warm-alabaster": "#F5F2EA",
        "warm-sand": "#EDE8DE",
        "ochre-gold": "#C59B27",
        "ochre-light": "#E9D28B",
        "deep-charcoal": "#1A201C",
        "stone-slate": "#4A5550",
        "subtle-border": "#E4DDD0",
        "parchment": "#FAF8F2",
        "border-crisp": "#E2E8F0",
        brand: { DEFAULT: "#133324", dark: "#0C2318", secondary: "#245037" },
        ink: "#0C2318",
        surface: { DEFAULT: "#FDFBF7", alt: "#F5F2EA", muted: "#EDE8DE" },
        navy: { DEFAULT: "#0B291B", light: "#12372A" }
      },
      fontFamily: {
        serif: ["'Newsreader'", "'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Cormorant Garamond'", "'Newsreader'", "serif"],
        heading: ["'Newsreader'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      borderRadius: {
        md: '0.25rem',
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(11,41,27,0.06), 0 2px 6px -2px rgba(11,41,27,0.04)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
  ],
}
