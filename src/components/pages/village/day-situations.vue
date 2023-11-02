<template>
  <div class="h-full flex flex-column overflow-y-auto">
    <div class="day-button-area flex mb-2">
      <button
        v-for="daySituation in displayDaySituations"
        :key="daySituation.day"
        class="flex-1 day-button text-white py-2 cursor-pointer"
        :class="`${activeDay === daySituation.day ? 'active' : ''}`"
        @click="selectDay(daySituation.day)"
      >
        {{ tabName(daySituation) }}
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
  participantIdToChara: any
}
const props = defineProps<Props>()

// emits
defineEmits<{
  (e: 'memo', participantId: number): void
}>()

const village = computed(() => useVillage().value!)

const displayDaySituations = computed(() => {
  if (village.value.epilogueDay == null) {
    return props.daySituations.filter((d) => d.day >= 1)
  } else {
    return props.daySituations.filter(
      (d) => d.day >= 1 && d.day <= village!.value.epilogueDay!
    )
  }
})

const activeDay = ref(
  displayDaySituations.value[displayDaySituations.value.length - 1].day
)
const tabName = (daySituation: VillageDaySituation): string => {
  if (village.value.epilogueDay === daySituation.day) return 'EP'
  else return `${daySituation.day}d`
}

const selectDay = (day: number) => {
  activeDay.value = day
}

watch(
  () => village.value!.id,
  () => {
    activeDay.value =
      displayDaySituations.value[displayDaySituations.value.length - 1].day
  }
)
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
