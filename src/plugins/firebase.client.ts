import { defineNuxtPlugin } from '#app'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Database, getDatabase } from 'firebase/database'

declare module '#app' {
  interface NuxtApp {
    $firebaseApp: FirebaseApp
    $firebaseDb: Database
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    databaseUrl: config.firebaseDatabaseUrl,
    projectId: config.firebaseProjectId
  }

  const app = initializeApp(firebaseConfig)
  nuxtApp.provide('firebaseApp', app)
  nuxtApp.provide('firebaseDb', getDatabase(app))
})
