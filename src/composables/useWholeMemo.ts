import { Ref } from 'vue'

export const useWholeMemo = (memo: string | null = null) => {
  const state: Ref<string> = useState('whole-memo', () => '')
  if (memo) {
    state.value = memo
  }
  return state
}
