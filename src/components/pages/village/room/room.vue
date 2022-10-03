<template>
  <RoomFootstepLines
    v-for="(footstep, idx) in footsteps"
    :key="`y${room.y}_x${room.x}_f${idx}`"
    :footsteps="footstep.footstep"
    :color="footstep.color"
    :room="room"
    :index="idx"
    :day-rooms="daySituation.rooms"
    :show="footstep.show"
  />
  <div v-if="memo" class="room-memo-area">
    <p class="my-0 white-space-normal text-sm" :style="`color: #${memoColor}`">
      {{ memo }}
    </p>
  </div>
  <div class="room-image" :style="roomImageStyle" />
  <div class="room-text-area">
    <span v-if="status" class="room-text" :class="statusClass"
      >{{ status }}<br
    /></span>
    <span v-if="isDummy" class="room-text">ダミー<br /></span>
    <span class="room-text">{{ charaName }}</span>
  </div>
</template>

<script setup lang="ts">
import RoomFootstepLines from '~/components/pages/village/footstep/room-footstep-lines.vue'

// props
interface Props {
  room: VillageDayRoom
  daySituation: VillageDaySituation
  village: Village
  participantIdToChara: any
  footsteps: Array<DayFootstep>
  participantMemo: ParticipantMemo | null
}
const props = defineProps<Props>()
const defaultWidth = 120
const defaultHeight = 120

const roomImageStyle = computed((): string => {
  if (props.room.participantId == null) {
    return `width: ${defaultWidth}px; height: ${defaultHeight}px; background-color: #gray; opacity: 0.2;`
  }
  const image = charaImageByParticipantId(props.room.participantId)
  const width = image.width
  const height = image.height
  const url = `background-image: url('${image.url}'); background-repeat: no-repeat; background-size: contain;`
  const opacity =
    props.room.isDead == null || props.room.isDead
      ? 'opacity: 0.2;'
      : 'opacity: 0.7;'
  return `width: ${width}px; height: ${height}px; ${url} ${opacity}`
})

const participant = computed((): VillageParticipant | null => {
  const participantId = props.room.participantId
  if (!participantId) return null
  return props.village.participants.list.find((p) => p.id === participantId)
})

const charaName = computed((): string => {
  const number = props.room.roomNumber
  const shortName = participant.value?.charaName?.shortName
  return `${number}${shortName ? ' ' + shortName : ''}`
})

const status = computed((): string | null => {
  const room = props.room
  if (room.isDead == null || !room.isDead) return null
  const deadDay = room.deadDay!
  const code = room.deadReason!.code
  let reason =
    code === 'SUDDON'
      ? '凸'
      : code === 'EXECUTE'
      ? '▼'
      : code == 'SUICIDE'
      ? '❤︎'
      : '▲'

  return `${deadDay}d ${reason}`
})

const statusClass = computed((): string | null => {
  const deadDay = props.room.deadDay
  const deadReason = props.room.deadReason?.code
  if (deadDay != props.daySituation.day) return null
  return deadReason === 'SUDDON'
    ? 'text-blue-500 font-bold'
    : deadReason === 'EXECUTE'
    ? 'text-blue-500 font-bold'
    : deadReason === 'SUICIDE'
    ? 'text-pink-500 font-bold'
    : 'text-red-500 font-bold'
})

const isDummy = computed((): boolean => {
  if (props.room.participantId == null) return false
  return (
    participant.value?.chara.id === props.village.setting.chara.dummyCharaId
  )
})

const charaImageByParticipantId = (
  id: number
): {
  width: number
  height: number
  url: string
} => {
  const chara = props.participantIdToChara[id] as Chara
  const url = chara.images.list.find(
    (i: CharaImage) => i.faceType.code === 'NORMAL'
  )!.url
  return {
    width: chara.size.width,
    height: chara.size.height,
    url: url.startsWith('https') ? url : `https://wolfort.net${url}`
  }
}

const memo = computed((): string => {
  if (!props.participantMemo) return ''
  const text = props.participantMemo.memo
  if (text.length <= 24) return text
  return text.slice(0, 23) + '...'
})

const memoColor = computed((): string => {
  if (!props.participantMemo) return ''
  return props.participantMemo.color || 'ffffff'
})
</script>
