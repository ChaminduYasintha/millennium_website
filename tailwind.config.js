/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Premium Navy + Gold Theme

        // Navy Colors
        'navy-darker': '#0A1628',        // Deepest navy
        'navy-dark': '#112240',          // Dark navy
        'navy': '#1B3A5F',               // Primary navy
        'navy-light': '#2E5077',         // Lighter navy

        // Gold Colors
        'gold': '#D4AF37',               // Rich gold
        'gold-light': '#E8C85A',         // Lighter gold
        'gold-pale': '#F5E6D3',          // Very pale gold

        // Neutral Colors
        'cream': '#FAF8F3',              // Warm cream
        'white': '#FFFFFF',
        'gray-light': '#F5F5F5',
        'gray': '#E5E5E5',
        'gray-dark': '#8B8B8B',

        // Text Colors
        'text-dark': '#1A1A1A',          // Almost black
        'text-navy': '#112240',          // Navy text
        'text-light': '#666666',         // Gray text
        'text-cream': '#FAF8F3',         // Cream text for dark bg
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sinhala: ['Noto Sans Sinhala', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

