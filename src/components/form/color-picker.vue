<template>
  <ColorPicker v-model="value" @show="appendBasicColor" />
  <div ref="basicColors" class="basic-color-palette">
    <div
      v-for="col in colors"
      :key="col"
      class="cursor-pointer additional-picker"
      :style="`background-color: #${col}`"
      @click="pick(col)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  value: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: string): string
}>()

const value = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value)
})

const basicColors = ref()
const appendBasicColor = () => {
  nextTick(() => {
    const panel = document.querySelector('.p-colorpicker-panel')
    panel?.append(basicColors.value)
  })
}

const colors = computed(() => {
  return ['ff0000', 'ffaa00', 'ffff00', '00ff00', '00aaff', 'ff00ff', 'ffffff']
})

const pick = (col: string) => {
  value.value = col
}
</script>

<style lang="scss" scoped>
.basic-color-palette {
  position: absolute;
  left: 8px;
  bottom: 8px;
  display: none !important;
}
.additional-picker {
  width: 17px;
  height: 17px;
  border-radius: 2px;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
}
</style>

<style lang="scss">
.p-colorpicker-panel {
  height: calc(166px + 30px) !important;

  .basic-color-palette {
    display: flex !important;
  }
}
</style>
