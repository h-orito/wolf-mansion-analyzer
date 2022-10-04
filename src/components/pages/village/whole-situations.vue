<template>
  <Splitter :direction="`${layout === 'layout1' ? 'column' : 'row'}`">
    <template #first>
      <Votes
        :day-situations="daySituations"
        :chara-id-to-participant-id="charaIdToParticipantId"
      />
    </template>

    <template #second>
      <div class="h-full overflow-y-auto flex flex-column">
        <label>全体メモ</label>
        <Textarea v-model="memo" class="w-full flex-1" />
      </div>
    </template>
  </Splitter>
</template>

<script setup lang="ts">
import Splitter from '~/components/splitter/splitter.vue'
import Votes from '~/components/pages/village/vote/votes.vue'

// props
interface Props {
  daySituations: Array<VillageDaySituation>
  charaIdToParticipantId: any
}
defineProps<Props>()

const memo = useWholeMemo()

const layout = useLayout()
</script>
