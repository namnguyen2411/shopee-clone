const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        primary: '#ee4e2e',
        yellowStar: '#ffce3d'
      },
      fontFamily: {
        'Heveltica-Neue': ['Heveltica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      backgroundImage: {
        'brand-register': "url('https://down-vn.img.susercontent.com/file/sg-11134004-7rbme-loxt03xks8t6fe')"
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1280px',
          margin: '0 auto'
        }
      })
    })
  ]
}
