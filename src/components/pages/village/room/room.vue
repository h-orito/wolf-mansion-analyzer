<template>
  <div
    class="h-full w-full"
    :class="`${room.participantId ? 'cursor-pointer' : ''}`"
    @click="openMemoModal(room.participantId)"
  >
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
    <div v-if="memo" class="room-memo-area line-height-1">
      <p
        class="my-0 white-space-normal text-xs"
        :style="`color: #${memoColor}`"
      >
        {{ memo }}
      </p>
    </div>
    <div class="room-image" :style="roomImageStyle" />
    <div class="room-text-area line-height-1">
      <span v-if="status" class="room-text text-xs" :class="statusClass"
        >{{ status }}<br
      /></span>
      <span v-if="isDummy" class="room-text text-xs">ダミー<br /></span>
      <span class="room-text text-xs">{{ charaName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomFootstepLines from '~/components/pages/village/footstep/room-footstep-lines.vue'
import { getParticipantMemo } from '~/components/state/memo/participant-memo'
import { getDailyFootstepMemos } from '~/components/state/memo/daily-footstep-memo'

// props
interface Props {
  room: VillageDayRoom
  daySituation: VillageDaySituation
  participantIdToChara: any
}
const props = defineProps<Props>()
const defaultWidth = 100
const defaultHeight = 100

// emits
const emit = defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const village = useVillage().value!
const footsteps = getDailyFootstepMemos(props.daySituation.day)

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
  return village.participants.list.find(
    (p: VillageParticipant) => p.id === participantId
  )
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
  return participant.value?.chara.id === village.setting.chara.dummyCharaId
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

const participantMemo = computed(() => {
  const id = props.room.participantId
  if (!id) return null
  return getParticipantMemo(id)
})

const memo = computed((): string => {
  if (!participantMemo.value) return ''
  const text = participantMemo.value.memo
  if (text.length <= 24) return text
  return text.slice(0, 23) + '...'
})

const memoColor = computed((): string => {
  if (!participantMemo.value) return ''
  return participantMemo.value.color || 'ffffff'
})

const openMemoModal = (participantId: number | null) => {
  if (participantId == null) return
  emit('memo', participantId)
}
</script>
