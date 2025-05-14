  module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          '0%': { opacity: '0', transform: 'translateY(100px)', filter: 'blur(33px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slidein: 'slidein 1s ease-in-out forwards',
        fadein: 'fadeIn 1s ease-out forwards',
        slideUp: 'slideUp 1s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
