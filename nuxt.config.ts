// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src/',
  typescript: {
    strict: true
  },
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    imageDomain: 'https://wolfort.net',
    apiBase: process.env.API_BASE || 'http://localhost:8089/wolf-mansion/',
    nodeEnv: process.env.NODE_ENV || 'local'
  },
  privateRuntimeConfig: {},
  css: [
    'primevue/resources/themes/vela-green/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/css/main.css',
    '@/assets/scss/main.scss'
  ]
})
