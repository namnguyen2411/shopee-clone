const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        'primary': '#ee4e2e'
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1280px',
          margin: '0 auto',
        }
      })
    })
  ],
}

