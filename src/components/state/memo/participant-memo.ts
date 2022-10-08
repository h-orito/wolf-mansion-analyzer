export const initParticipantMemos = (
  memo: PlayerMemo | null,
  village: Village
) => {
  if (memo != null) {
    useParticipantMemos(
      village.participants.list.map((p: VillageParticipant) => {
        const existing = memo!.participantMemos.find(
          (pm) => pm.participantId === p.id
        )
        return existing || getInitialMemo(p.id)
      })
    )
    return
  }

  useParticipantMemos(
    village.participants.list.map((p: VillageParticipant) =>
      getInitialMemo(p.id)
    )
  )
}

const getInitialMemo = (id: number): ParticipantMemo => ({
  participantId: id,
  memo: '',
  color: 'ffffff'
})

export const clearParticipantMemos = () => useParticipantMemos([])

export const getParticipantMemo = (id: number): ParticipantMemo | null => {
  return (
    useParticipantMemos().value?.find((pm) => pm.participantId === id) || null
  )
}

export const setParticipantMemo = (id: number, memo: ParticipantMemo) => {
  const updated = useParticipantMemos().value!.map((m) => {
    return m.participantId === id ? memo : m
  })
  useParticipantMemos(updated)
}
