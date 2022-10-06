import { Ref } from 'vue'

export const usePlayer = (player: Player | null = null, clear = false) => {
  const state: Ref<Player | null> = useState('player', () => null)
  if (player) {
    state.value = player
  }
  if (clear) {
    state.value = null
  }
  return state
}
