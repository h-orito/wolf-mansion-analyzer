<template>
  <span v-if="isShow">
    <Line
      v-if="hasUp"
      direction="up"
      :index="index"
      :is-round="isRound"
      :color="color"
    />
    <Line
      v-if="hasRight"
      direction="right"
      :index="index"
      :is-round="isRound"
      :color="color"
    />
    <Line
      v-if="hasDown"
      direction="down"
      :index="index"
      :is-round="isRound"
      :color="color"
    />
    <Line
      v-if="hasLeft"
      direction="left"
      :index="index"
      :is-round="isRound"
      :color="color"
    />
    <Line
      v-if="shouldShowDot"
      direction="dot"
      :index="index"
      :is-round="false"
      :color="color"
    />
  </span>
</template>

<script setup lang="ts">
import Line from '~/components/pages/village/footstep/line.vue'

// props
interface Props {
  show: boolean
  footsteps: string
  color: string
  room: VillageDayRoom
  dayRooms: Array<VillageDayRoom>
  index: number
}
const props = defineProps<Props>()

const roomNumbers = computed((): Array<number> => {
  return props.footsteps.split(',').map((r) => parseInt(r))
})

const isShow = computed((): boolean => {
  return (
    props.show && roomNumbers.value.some((r) => r === props.room.roomNumber)
  )
})

const rooms = computed((): Array<VillageDayRoom> => {
  return roomNumbers.value.map(
    (rn) => props.dayRooms.find((r) => r.roomNumber === rn)!
  )
})

const hasUp = computed((): boolean => {
  const room = props.room
  return rooms.value.some((r) => r.x === room.x && r.y < room.y)
})

const hasRight = computed((): boolean => {
  const room = props.room
  return rooms.value.some((r) => r.y === room.y && room.x < r.x)
})

const hasDown = computed((): boolean => {
  const room = props.room
  return rooms.value.some((r) => r.x === room.x && room.y < r.y)
})

const hasLeft = computed((): boolean => {
  const room = props.room
  return rooms.value.some((r) => r.y === room.y && r.x < room.x)
})

const shouldShowDot = computed((): boolean => {
  if (roomNumbers.value.length === 1) return true
  return !(hasUp.value || hasRight.value || hasDown.value || hasLeft.value)
})

const isRound = computed((): boolean => {
  const x = new Set(rooms.value.map((r) => r.x))
  const y = new Set(rooms.value.map((r) => r.y))
  return x.size > 1 && y.size > 1
})
</script>
