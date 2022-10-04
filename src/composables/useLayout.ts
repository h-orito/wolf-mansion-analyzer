import { Ref } from 'vue'

export const useLayout = (layout: string | null = null) => {
  const state: Ref<string> = useState('layout', () => 'layout1')
  if (layout) {
    state.value = layout
  }
  return state
}
