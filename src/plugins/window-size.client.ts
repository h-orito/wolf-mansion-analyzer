import { defineNuxtPlugin } from '#app'

declare module '#app' {
  interface NuxtApp {
    $isSp: boolean
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const width = document.documentElement.clientWidth
  nuxtApp.provide('isSp', width < 992)
})
