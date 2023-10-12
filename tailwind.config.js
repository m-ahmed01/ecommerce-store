/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // you can apply tailwind on all these files
  ],
  theme: {
    extend: {
  
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },

  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

