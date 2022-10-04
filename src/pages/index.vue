<template>
  <Title>WOLF MANSION考察ツール - {{ village.name }}</Title>
  <div class="w-full h-full flex flex-column">
    <div class="flex-1 flex flex-column h-full overflow-auto">
      <Splitter
        :direction="`${layout === 'layout1' ? 'row' : 'column'}`"
        class="h-full overflow-auto"
        :size="70"
      >
        <template #first>
          <DaySituations
            :day-situations="response.days"
            :village="response.village"
            :participant-id-to-chara="response.participantIdToChara"
            @memo="openParticipantModal"
          />
        </template>
        <template #second>
          <WholeSituations
            :day-situations="response.days"
            :village="response.village"
            :chara-id-to-participant-id="response.charaIdToParticipantId"
          />
        </template>
      </Splitter>
    </div>
    <ParticipantMemoModal ref="participantModal" />
  </div>
</template>

<script setup lang="ts">
import DaySituations from '~/components/pages/village/day-situations.vue'

import WholeSituations from '~/components/pages/village/whole-situations.vue'
import ParticipantMemoModal from '~/components/pages/village/participant-memo-modal.vue'
import Splitter from '~/components/splitter/splitter.vue'
import { initParticipantMemos } from '~/components/state/memo/participant-memo'
import { initWholeMemo } from '~/components/state/memo/whole-memo'
import { initDailyMemos } from '~/components/state/memo/daily-memo'

const response = await useApi<void, WholeVillageSituationsContent>(
  'api/village/441'
)

const village = useVillage(response.village).value!

initParticipantMemos(village)
initWholeMemo()
initDailyMemos(village)

const layout = useLayout()

const participantModal = ref()
const openParticipantModal = (participantId: number) => {
  participantModal.value.open(participantId)
}
</script>

<style lang="scss">
html,
body,
.container,
.wrapper {
  height: 100vh;
}

table {
  border-collapse: collapse;
  td,
  th {
    border: 1px solid var(--bluegray-800);
  }
}

.p-splitter {
  border: 0;
  background-color: transparent;

  .p-splitter-gutter {
    background: #333;
  }
}

.p-tabview .p-tabview-panels {
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.room {
  position: relative;
  text-align: center;
  width: 100px;
  min-width: 100px;
  height: 100px;
  padding: 0;

  .room-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .room-memo-area {
    position: absolute;
    width: 100px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.5);
    z-index: 2;
  }

  .room-text-area {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    opacity: 0.8;

    .room-text {
      background-color: #222222;
      white-space: nowrap;
    }
  }
}
</style>
