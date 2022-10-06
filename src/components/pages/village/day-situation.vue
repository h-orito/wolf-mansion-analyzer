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
          :participant-id-to-chara="participantIdToChara"
          @memo="$emit('memo', $event)"
        />
      </div>
    </template>
    <template #second>
      <div class="h-full overflow-y-auto">
        <Splitter direction="column" :size="50" base-selector=".day-panel-area">
          <template #first>
            <div class="h-full overflow-y-auto">
              <Footsteps :day-situation="daySituation" />
            </div>
          </template>
          <template #second>
            <div class="h-full overflow-y-auto flex flex-column">
              <label>{{ daySituation.day }}dメモ</label>
              <Textarea v-model="memo" class="w-full flex-1" rows="10" />
              <div class="flex justify-content-end mt-1">
                <a class="cursor-pointer" @click="openWholeDailyMemoDialog"
                  >全デイリーメモ確認</a
                >
              </div>
            </div>
          </template>
        </Splitter>
      </div>
    </template>
  </Splitter>
</template>

<script setup lang="ts">
import RoomTable from '~/components/pages/village/room/room-table.vue'
import Footsteps from '~/components/pages/village/footstep/footsteps.vue'
import Splitter from '~/components/splitter/splitter.vue'
import { getDailyMemo } from '~/components/state/memo/daily-memo'

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

const dailyMemo = getDailyMemo(props.daySituation.day)
const memo = computed({
  get: () => dailyMemo.memo,
  set: (value: string) => (dailyMemo.memo = value)
})

const openWholeDailyMemoDialog = () => {
  useShowWholeDailyMemoDialog().value = true
}
</script>
