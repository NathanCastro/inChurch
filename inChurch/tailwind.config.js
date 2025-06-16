module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primary_light: 'var(--color-primary-light)',
        primary_dark: 'var(--color-primary)',
        text_dark: 'var(--color-text-dark)',
        details: 'var(--color-details)'
      }
    },
  },
  plugins: [],
}
