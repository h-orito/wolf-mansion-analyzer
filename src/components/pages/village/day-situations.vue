<template>
  <div class="h-full flex flex-column overflow-y-auto">
    <div class="day-button-area flex mb-2">
      <button
        v-for="daySituation in displayDaySituations"
        :key="daySituation.day"
        class="flex-1 day-button text-white px-3 py-2 cursor-pointer"
        :class="`${activeDay === daySituation.day ? 'active' : ''}`"
        @click="selectDay(daySituation.day)"
      >
        {{ `${daySituation.day}d` }}
      </button>
    </div>
    <div class="day-panel-area flex-1 h-full overflow-y-auto">
      <div
        v-for="daySituation in displayDaySituations"
        v-show="activeDay === daySituation.day"
        :key="daySituation.day"
        class="h-full overflow-y-auto"
      >
        <DaySituation
          :day-situation="daySituation"
          :village="village"
          :participant-id-to-chara="participantIdToChara"
          @memo="$emit('memo', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DaySituation from '~/components/pages/village/day-situation.vue'

// props
interface Props {
  daySituations: Array<VillageDaySituation>
  village: Village
  participantIdToChara: any
}
const props = defineProps<Props>()

// emits
defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const displayDaySituations = computed(() => {
  return props.daySituations.filter((d) => d.day >= 2)
})

const activeDay = ref(
  displayDaySituations.value[displayDaySituations.value.length - 1].day
)
const selectDay = (day: number) => {
  activeDay.value = day
}
</script>

<style lang="scss" scoped>
.day-button {
  background-color: #304562;
  border: 0;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &.active {
    color: #00ff00;
    border-bottom: 1px solid #00ff00;
  }
}
</style>
