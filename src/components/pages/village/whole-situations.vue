<template>
  <Splitter :direction="`${layout === 'layout1' ? 'column' : 'row'}`">
    <template #first>
      <div class="h-full w-full overflow-auto flex flex-column">
        <div class="flex justify-content-end mb-2">
          <ButtonPrimary
            class="py-1 mr-2"
            label="本家を開く"
            @click="openMansion"
          />
          <ButtonPrimary
            class="py-1 mr-2"
            label="メモ保存"
            @click="saveMemos"
          />
          <ButtonPrimary
            class="py-1"
            :disabled="!isProgress"
            label="村状況更新"
            @click="$emit('refresh-village')"
          />
        </div>
        <Votes
          :day-situations="daySituations"
          :chara-id-to-participant-id="charaIdToParticipantId"
        />
      </div>
    </template>

    <template #second>
      <div class="h-full overflow-y-auto flex flex-column">
        <label>全体メモ</label>
        <Textarea v-model="memo" class="w-full flex-1" @focusout="saveMemos" />
      </div>
    </template>
  </Splitter>
</template>

<script setup lang="ts">
import Splitter from '~/components/splitter/splitter.vue'
import Votes from '~/components/pages/village/vote/votes.vue'
import { saveMemos } from '~/components/state/memo/memo'

// props
interface Props {
  daySituations: Array<VillageDaySituation>
  charaIdToParticipantId: any
}
defineProps<Props>()

defineEmits<{
  (e: 'refresh-village'): void
}>()

const isProgress = computed(
  () => useVillage().value?.status.code === 'IN_PROGRESS'
)
const memo = useWholeMemo()

const openMansion = () => {
  const village = useVillage().value!
  window.open(`https://wolfort.net/wolf-mansion/village/${village.id}`)
}

const layout = useLayout()
</script>
