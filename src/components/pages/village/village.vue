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
            @refresh-village="$emit('refresh-village')"
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

// props
interface Props {
  situation: WholeVillageSituationsContent
}
defineProps<Props>()

defineEmits<{
  (e: 'refresh-village'): void
}>()

const layout = useLayout()

const participantModal = ref()
const openParticipantModal = (participantId: number) => {
  participantModal.value.open(participantId)
}
</script>
