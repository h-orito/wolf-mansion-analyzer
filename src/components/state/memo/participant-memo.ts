export const initParticipantMemos = (village: Village) => {
  // TODO: RTDBからの取得処理

  useParticipantMemos(
    village.participants.list.map((p: VillageParticipant) => {
      return {
        participantId: p.id,
        memo: '',
        color: 'ffffff'
      }
    })
  )
}

export const getParticipantMemo = (id: number): ParticipantMemo | null => {
  return (
    useParticipantMemos().value?.find((pm) => pm.participantId === id) || null
  )
}

export const saveParticipantMemo = () => {
  // TODO: RTDBに保存
}
