<template>
  <table>
    <tbody>
      <tr v-for="(yRooms, y) in roomRows" :key="`y${y}_rooms`">
        <td v-for="(room, x) in yRooms" :key="`y${y}_x${x}`" class="room">
          <Room
            :room="room"
            :day-situation="daySituation"
            :participant-id-to-chara="participantIdToChara"
            @memo="$emit('memo', $event)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Room from '~/components/pages/village/room/room.vue'

// props
interface Props {
  daySituation: VillageDaySituation
  participantIdToChara: any
}
const props = defineProps<Props>()

// emits
defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const village = useVillage().value!

const roomRows = computed((): Array<Array<VillageDayRoom>> => {
  return [...Array(village.roomSize!.height)]
    .map((_, i) => i)
    .map((y) => {
      return props.daySituation.rooms.filter((r) => r.y === y)
    })
})
</script>
