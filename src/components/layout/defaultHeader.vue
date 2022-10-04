<template>
  <div
    class="flex justify-content-center align-items-center bg-bluegray-900 w-full"
  >
    <div class="text-left px-2">
      <NuxtLink to="/" class="title-font text-white text-xl"
        >WOLF MANSION Analyzer</NuxtLink
      >
    </div>
    <div v-if="village">- {{ village.name }}</div>
    <div v-if="false" class="ml-auto mr-2 my-auto">
      <SelectButton
        v-model="layout"
        :options="layouts"
        option-label="name"
        option-value="code"
        class="layout-select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const village = useVillage()

// TODO: レイアウト切り替え機能
const layouts = computed(() => {
  return [
    {
      name: 'Layout1',
      code: 'layout1'
    },
    {
      name: 'Layout2',
      code: 'layout2'
    }
  ]
})

const layout = useLayout()
</script>

<style lang="scss">
.layout-select {
  .p-button {
    padding: 0.25rem 0.5rem;
  }
}
</style>
