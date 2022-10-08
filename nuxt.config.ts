// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src/',
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://wolfort.net/wolf-mansion/',
      nodeEnv: process.env.NODE_ENV || 'local',
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID
    }
  },
  css: [
    'primevue/resources/themes/vela-green/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/css/main.css',
    '@/assets/scss/main.scss'
  ]
})
