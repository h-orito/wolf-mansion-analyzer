import { Ref } from 'vue'

export const useParticipantMemos = (
  memos: Array<ParticipantMemo> | null = null
) => {
  const state: Ref<Array<ParticipantMemo> | null> = useState(
    'participant-memos',
    () => null
  )
  if (memos) {
    state.value = memos
  }
  return state
}
