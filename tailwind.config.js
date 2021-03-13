const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['bg-yellow-400', 'bg-yellow-500', 'h-3', 'w-3', 'h-4', 'w-4', 'ml-36']
    }
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
      transitionProperty: {
        'height': 'height'
      }
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      "ro": "1.5rem"
    }
  },
  variants: {
    extend: {
      width: ['focus'],
    }
  }
}
