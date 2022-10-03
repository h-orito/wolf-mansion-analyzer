<template>
  <Title>WOLF MANSION考察ツール</Title>
  <div class="w-full h-full flex flex-column">
    <div>
      <h1>{{ response.village.name }}</h1>
    </div>
    <div class="flex-1 flex flex-column h-full overflow-auto">
      <MySplitter direction="column" class="h-full overflow-auto" :size="60">
        <template #first>
          <DaySituations
            :day-situations="response.days"
            :village="response.village"
            :participant-id-to-chara="response.participantIdToChara"
            :participant-memos="participantMemos"
            @memo="openParticipantModal"
          />
        </template>
        <template #second>
          <Votes
            :day-situations="response.days"
            :village="response.village"
            :chara-id-to-participant-id="response.charaIdToParticipantId"
          />
        </template>
      </MySplitter>
    </div>
    <ParticipantMemoModal
      ref="participantModal"
      v-model:participant-memos="participantMemos"
      :village="response.village"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import DaySituations from '~/components/pages/village/day-situations.vue'

import Votes from '~/components/pages/village/vote/votes.vue'
import ParticipantMemoModal from '~/components/pages/village/participant-memo-modal.vue'
import MySplitter from '~/components/splitter/splitter.vue'

const response = await useApi<void, WholeVillageSituationsContent>(
  'api/village/441'
)

const participantMemos: Ref<Array<ParticipantMemo>> = ref(
  response.village.participants.list.map((p: VillageParticipant) => {
    return {
      participantId: p.id,
      memo: '',
      color: 'ffffff'
    }
  })
)

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
  width: 120px;
  min-width: 120px;
  height: 120px;
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
    width: 120px;
    height: 60px;
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
