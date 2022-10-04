<template>
  <Splitter
    direction="row"
    :size="60"
    base-selector=".day-panel-area"
    class="h-full"
  >
    <template #first>
      <div class="h-full overflow-y-auto p-2">
        <RoomTable
          :day-situation="daySituation"
          :village="village"
          :participant-id-to-chara="participantIdToChara"
          :footsteps="footsteps"
          @memo="$emit('memo', $event)"
        />
      </div>
    </template>
    <template #second>
      <div class="h-full overflow-y-auto">
        <Splitter direction="column" :size="50" base-selector=".day-panel-area">
          <template #first>
            <div class="h-full overflow-y-auto">
              <label>足音</label>
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
              <label>{{ daySituation.day }}dメモ</label>
              <Textarea v-model="memo" class="w-full flex-1" rows="10" />
            </div>
          </template>
        </Splitter>
      </div>
    </template>
  </Splitter>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import RoomTable from '~/components/pages/village/room/room-table.vue'
import Footstep from '~/components/pages/village/footstep/footstep.vue'
import Splitter from '~/components/splitter/splitter.vue'
import { getDailyMemo } from '~/components/state/memo/daily-memo'

// props
interface Props {
  daySituation: VillageDaySituation
  village: Village
  participantIdToChara: any
}
const props = defineProps<Props>()

// emits
defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const dailyMemo = getDailyMemo(props.daySituation.day)
const memo = computed({
  get: () => dailyMemo.memo,
  set: (value: string) => (dailyMemo.memo = value)
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
</script>
