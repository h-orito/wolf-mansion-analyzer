import { initParticipantMemos, clearParticipantMemos } from './participant-memo'
import { initWholeMemo, clearWholeMemo } from './whole-memo'
import { initDailyMemos, clearDailyMemos } from './daily-memo'
import {
  initDailyFootstepMemos,
  clearDailyFootstepMemos
} from './daily-footstep-memo'
import {
  fetchPlayerMemo,
  registerPlayerMemo
} from '~/components/firebase/database'

export const initMemos = async (
  daySituations: Array<VillageDaySituation>,
  village: Village
) => {
  const player = usePlayer().value
  if (!player) return
  const memos = await fetchPlayerMemo(player, village)
  initParticipantMemos(memos, village)
  initWholeMemo(memos)
  initDailyMemos(memos, village)
  initDailyFootstepMemos(memos, daySituations)
}

export const clearMemos = () => {
  clearParticipantMemos()
  clearWholeMemo()
  clearDailyMemos()
  clearDailyFootstepMemos()
}

export const saveMemos = async (): Promise<void> => {
  const player = usePlayer().value
  if (!player) return
  const village = useVillage().value!
  const memos = {
    dailyMemos: useDailyMemos().value!,
    dailyFootstepMemos: useDailyFootstepMemos().value!,
    wholeMemo: useWholeMemo().value!,
    participantMemos: useParticipantMemos().value!
  }
  await registerPlayerMemo(player, village, memos)
}
