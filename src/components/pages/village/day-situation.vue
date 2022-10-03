<template>
  <MySplitter
    direction="row"
    :size="70"
    base-selector=".day-panel-area"
    class="h-full"
  >
    <template #first>
      <div class="h-full overflow-y-auto p-2">
        <table>
          <tbody>
            <tr v-for="(yRooms, y) in roomRows" :key="`y${y}_rooms`">
              <td
                v-for="(room, x) in yRooms"
                :key="`y${y}_x${x}`"
                class="room"
                :class="`${room.participantId ? 'cursor-pointer' : ''}`"
                @click="openMemoModal(room.participantId)"
              >
                <Room
                  :room="room"
                  :day-situation="daySituation"
                  :village="village"
                  :participant-id-to-chara="participantIdToChara"
                  :footsteps="footsteps"
                  :participant-memo="participantMemo(room)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #second>
      <div class="h-full overflow-y-auto">
        <MySplitter
          direction="column"
          :size="50"
          base-selector=".day-panel-area"
        >
          <template #first>
            <div class="h-full overflow-y-auto">
              <h2>足音</h2>
              <div v-if="footsteps.length > 0" class="p-2">
                <div class="text-left">
                  <a class="cursor-pointer mr-2" @click="allOn">全てON</a>
                  <a class="cursor-pointer mr-2" @click="allOff">全てOFF</a>
                  <a class="cursor-pointer" @click="reverse">反転</a>
                </div>
                <table class="w-full">
                  <tr v-for="(footstep, idx) in footsteps" :key="`f${idx}`">
                    <Footstep
                      :id="`d${daySituation.day}_f${idx}`"
                      v-model:value="footstep.show"
                      v-model:color="footstep.color"
                      v-model:memo="footstep.memo"
                      :label="footstep.footstep"
                    />
                  </tr>
                </table>
              </div>
            </div>
          </template>
          <template #second>
            <div class="h-full overflow-y-auto flex flex-column">
              <h2>{{ daySituation.day }}dメモ</h2>
              <Textarea v-model="dailyMemo" class="w-full flex-1" rows="10" />
            </div>
          </template>
        </MySplitter>
      </div>
    </template>
  </MySplitter>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import Room from '~/components/pages/village/room/room.vue'
import Footstep from '~/components/pages/village/footstep/footstep.vue'
import MySplitter from '~/components/splitter/splitter.vue'

// props
interface Props {
  daySituation: VillageDaySituation
  village: Village
  participantIdToChara: any
  participantMemos: Array<ParticipantMemo>
}
const props = defineProps<Props>()

// emits
const emit = defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const dailyMemo = ref('')

const roomRows = computed((): Array<Array<VillageDayRoom>> => {
  return [...Array(props.village.roomSize!.height)]
    .map((_, i) => i)
    .map((y) => {
      return props.daySituation.rooms.filter((r) => r.y === y)
    })
})

const footsteps: Ref<Array<DayFootstep>> = ref([])
onMounted(() => {
  footsteps.value = props.daySituation.footsteps.map((f, index) => {
    return {
      footstep: f,
      color: getColor(index),
      show: true,
      memo: ''
    }
  })
})

const getColor = (index: number): string => {
  return index % 7 === 0
    ? 'ff0000'
    : index % 7 === 1
    ? '00ff00'
    : index % 7 === 2
    ? '00aaff'
    : index % 7 === 3
    ? 'ffaa00'
    : index % 7 === 4
    ? 'ffff00'
    : index % 7 === 5
    ? 'ffffff'
    : 'ff00ff'
}

const allOn = () => {
  footsteps.value = footsteps.value.map((f) => {
    f.show = true
    return f
  })
}
const allOff = () => {
  footsteps.value = footsteps.value.map((f) => {
    f.show = false
    return f
  })
}
const reverse = () => {
  footsteps.value = footsteps.value.map((f) => {
    f.show = !f.show
    return f
  })
}

const openMemoModal = (participantId: number | null) => {
  if (participantId == null) return
  emit('memo', participantId)
}

const participantMemo = (room: VillageDayRoom): ParticipantMemo | null => {
  return (
    props.participantMemos.find(
      (pm) => pm.participantId === room.participantId
    ) || null
  )
}
</script>
