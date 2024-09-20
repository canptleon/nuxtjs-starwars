export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-09-20',
});