import { Ref } from 'vue'

export const useVillage = (village: Village | null = null) => {
  const state: Ref<Village | null> = useState('village', () => null)
  if (village) {
    state.value = village
  }
  return state
}
