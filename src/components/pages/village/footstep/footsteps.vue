<template>
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
</template>

<script setup lang="ts">
import Footstep from '~/components/pages/village/footstep/footstep.vue'
import {
  getDailyFootstepMemos,
  showAll,
  hideAll,
  reverseAll
} from '~/components/state/memo/daily-footstep-memo'

// props
interface Props {
  daySituation: VillageDaySituation
}
const props = defineProps<Props>()

const footsteps = getDailyFootstepMemos(props.daySituation.day)

const allOn = () => showAll(props.daySituation.day)
const allOff = () => hideAll(props.daySituation.day)
const reverse = () => reverseAll(props.daySituation.day)
</script>
