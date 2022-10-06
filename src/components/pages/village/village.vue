<template>
  <div class="h-full overflow-auto">
    <div class="flex-1 flex flex-column h-full overflow-auto">
      <Splitter
        :direction="`${layout === 'layout1' ? 'row' : 'column'}`"
        class="h-full overflow-auto"
        :size="70"
      >
        <template #first>
          <DaySituations
            :day-situations="situation.days"
            :participant-id-to-chara="situation.participantIdToChara"
            @memo="openParticipantModal"
          />
        </template>
        <template #second>
          <WholeSituations
            :day-situations="situation.days"
            :chara-id-to-participant-id="situation.charaIdToParticipantId"
          />
        </template>
      </Splitter>
    </div>
    <ParticipantMemoModal ref="participantModal" />
    <WholeDailyMemoDialog />
  </div>
</template>

<script setup lang="ts">
import DaySituations from '~/components/pages/village/day-situations.vue'
import WholeSituations from '~/components/pages/village/whole-situations.vue'
import ParticipantMemoModal from '~/components/pages/village/participant-memo-modal.vue'
import WholeDailyMemoDialog from '~/components/pages/village/whole-daily-memo-dialog.vue'
import Splitter from '~/components/splitter/splitter.vue'
import { initParticipantMemos } from '~/components/state/memo/participant-memo'
import { initWholeMemo } from '~/components/state/memo/whole-memo'
import { initDailyMemos } from '~/components/state/memo/daily-memo'
import { initDailyFootstepMemos } from '~/components/state/memo/daily-footstep-memo'

// props
interface Props {
  situation: WholeVillageSituationsContent
}
const props = defineProps<Props>()

const village = useVillage(props.situation.village).value!

const layout = useLayout()

const participantModal = ref()
const openParticipantModal = (participantId: number) => {
  participantModal.value.open(participantId)
}

const reset = async () => {
  initParticipantMemos(village)
  initWholeMemo()
  initDailyMemos(village)
  initDailyFootstepMemos(props.situation.days)
}
await reset()

defineExpose({
  reset
})
</script>
