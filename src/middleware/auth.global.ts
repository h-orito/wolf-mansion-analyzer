import { getBan, getPlayer } from '~/components/auth/auth-cookie'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  const ban = getBan()
  if (ban) {
    location.href = 'https://google.co.jp'
  }

  if (to.fullPath === '/login') return

  const player = getPlayer()
  if (!player) {
    return navigateTo('/login')
  }

  usePlayer(player)
})
