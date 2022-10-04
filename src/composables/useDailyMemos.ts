import { Ref } from 'vue'

export const useDailyMemos = (memos: Array<DailyMemo> | null = null) => {
  const state: Ref<Array<DailyMemo> | null> = useState(
    'daily-memos',
    () => null
  )
  if (memos) {
    state.value = memos
  }
  return state
}
