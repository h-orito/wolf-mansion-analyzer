<template>
  <Dialog
    v-model:visible="isShow"
    header="デイリーメモまとめ"
    class="text-sm overflow-y-auto"
    style="min-width: 30vw; max-width: 50vw; max-height: 50vh"
    @hide="isShow = false"
  >
    <div
      v-for="dailyMemo in displayDailyMemos"
      :key="dailyMemo.day"
      class="mb-4 text-left"
    >
      <h3>{{ dailyMemo.day }}d</h3>
      <p class="pre-wrap border-1 border-gray-500 p-2">
        {{ dailyMemo.memo }}
      </p>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { getWholeDailyMemos } from '~/components/state/memo/daily-memo'

const isShow = computed({
  get: () => useShowWholeDailyMemoDialog().value,
  set: (value: boolean | undefined) =>
    (useShowWholeDailyMemoDialog().value = value ?? false)
})

const dailyMemos = getWholeDailyMemos()
const displayDailyMemos = computed(() =>
  dailyMemos.filter((dm) => dm.memo.length > 0)
)
</script>

<style lang="scss">
.p-dialog .p-dialog-header,
.p-dialog .p-dialog-content {
  padding: 1rem;
}
</style>
