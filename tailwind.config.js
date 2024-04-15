/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main-color)',
        mainDarker: 'var(--main-darker-color)',
        card: 'var(--card-color)',
        cardDarker: 'var(--card-darker-color)',
        text: 'var(--text-color)',
        light: 'var(--light-color)',
      },
      backgroundImage: {
        lightGradient: `linear-gradient(
          90deg,
          transparent 5%,
          var(--light-color) 20%,
          transparent 35%,
          var(--light-color) 50%,
          transparent 65%,
          var(--light-color) 80%,
          transparent 95%
        )`,
      },
      animation: {
        lightMove: 'lightMove ease-in-out infinite 10s',
        rotateAnim: 'rotate linear infinite 5s'
      },
      keyframes: {
        lightMove: {
          '0%, 100%': {
            transform:
              'translateX(-50%) translateY(-25%) scaleY(200%) rotateX(30deg) rotateZ(-10deg)',
          },
          '50%': {
            transform:
              'translateX(-50%) translateY(-25%) scaleY(200%) rotateX(30deg) rotateZ(10deg)',
          },
        },
        rotate: {
          '0%': {
            transform: 'rotateY(0deg)',
          },
          '100%': {
            transform: 'rotateY(360deg)'
          }
        }
      },
    },
  },
  plugins: [],
};
