<template>
  <div class="flex flex-column h-full wrapper">
    <Title>{{ title }}</Title>
    <VillageHeader @clear-village="clear" />
    <div class="flex-1 p-2 w-full max-w-full mx-auto h-full overflow-auto">
      <div class="w-full h-full">
        <Village v-if="situation" ref="villageRef" :situation="situation" />
        <div v-else class="flex flex-column h-full">
          <p>村を選択してください。</p>
          <Listbox
            v-model="id"
            :options="villageCandidates"
            :filter="true"
            option-label="label"
            option-value="value"
            class="text-left"
            filter-placeholder="Search"
            :virtual-scroller-options="{ itemSize: 40 }"
            list-style="height: 50vh"
            @change="fetchSituation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import VillageHeader from '~/components/pages/village/header/village-header.vue'
import Village from '~/components/pages/village/village.vue'

const villagesContent: VillageListContent = await useApi<
  void,
  VillageListContent
>('api/village-list')
const villageCandidates = computed(() => {
  return villagesContent.villageList.map((v) => {
    return {
      label: `${v.villageNumber} - ${v.villageName}`,
      value: v.villageId
    }
  })
})
const id = ref()

const situation: Ref<WholeVillageSituationsContent | null> = ref(null)
const fetchSituation = async () => {
  situation.value = await useApi<void, WholeVillageSituationsContent>(
    `api/village/${id.value}`
  )
}

const villageRef = ref()
const clear = () => {
  id.value = null
  situation.value = null
  villageRef.value.reset()
}

const title = computed(() => {
  const base = 'WOLF MANSION Analyzer - '
  if (!situation.value) return base + '村選択'
  const village = situation.value.village
  return base + `${village.id} ${village.name}`
})
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

.p-listbox-list-wrapper {
  max-height: 100%;
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
