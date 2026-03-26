import uiPreset from './tailwind-preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiPreset],
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
