import { ref, get, set } from 'firebase/database'

export const fetchPlayerMemo = async (
  player: Player,
  village: Village
): Promise<PlayerMemo | null> => {
  const { $firebaseDb } = useNuxtApp()
  const snapshot = (
    await get(
      ref($firebaseDb, `players/${player.id}/village/${village.id}/memo`)
    )
  ).val()
  if (snapshot == null) return null
  return {
    ...snapshot
  }
}

export const registerPlayerMemo = (
  player: Player,
  village: Village,
  memo: PlayerMemo
) => {
  const { $firebaseDb } = useNuxtApp()
  set(ref($firebaseDb, `players/${player.id}/village/${village.id}/memo`), memo)
}
