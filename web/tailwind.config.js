module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'menu-show-up': {
          from: {
            top: '-100%',
          },
          to: {
            top: 'top-16'
          }
        }
      },
      animation: {
        'menu-show-up': 'menu-show-up 50ms ease-in-out'
      }
    },
  },
  plugins: [],
}