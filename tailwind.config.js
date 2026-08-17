/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          bg: '#FAECE7',
          text: '#4A1B0C',
          border: '#F4C5B0',
        },
        rose: {
          bg: '#FBEAF0',
          text: '#4B1528',
          border: '#F2BDD0',
        },
        teal: {
          bg: '#E1F5EE',
          text: '#04342C',
          border: '#A7E3CE',
        },
        purple: {
          bg: '#EEEDFE',
          text: '#26215C',
          border: '#C7C4F8',
        },
        sky: {
          bg: '#E0F2FE',
          text: '#0C4A6E',
          border: '#BAE6FD',
        },
        amber: {
          bg: '#FEF3C7',
          text: '#78350F',
          border: '#FDE68A',
        },
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
