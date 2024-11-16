/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'font-bold',
    'text-lg',
    'bg-black',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'router-link',
    'router-link-active'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

