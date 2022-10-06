import { Ref } from 'vue'

export const useDailyFootstepMemos = (
  memos: Array<DailyFootstepMemo> | null = null
) => {
  const state: Ref<Array<DailyFootstepMemo> | null> = useState(
    'daily-footstep-memos',
    () => null
  )
  if (memos) {
    state.value = memos
  }
  return state
}
