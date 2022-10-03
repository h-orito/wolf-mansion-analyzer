type Village = {
  id: number
  name: string
  status: VillageStatus
  roomSize: RoomSize | null
  participants: VillageParticipants
  days: VillageDays
  setting: VillageSetting
  epilogueDay: number | null
}
