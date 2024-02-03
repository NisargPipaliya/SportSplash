/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      backgroundColor: {
        'common': '#ecf2fc',
         'navbar' : '#6190E6',
         'button' : '#061125',
         'button-hover' : '#02060e',
         'card' : '#d1dff8',
         'card-header' : '#6190E6',
          'card-hover' : '#ecf2fc',
      },
      textColor: {
        'warning' : 'red',
        'common': '#0F1035',
        'nav': '#0F1035',
        'nav-hover': '#DCF2F1',
        'button' : '#DCF2F1',
        'button-hover' : '#7FC7D9'
      },
      borderColor: {
        'common': '#0F1035',
        'nav': '#0F1035',
        'nav-hover': '#DCF2F1',
        'button' : 'white',
        'button-hover' : '#7FC7D9'
      },

    }
  }
}