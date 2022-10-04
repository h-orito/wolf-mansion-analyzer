<template>
  <td><Checkbox v-model="value" :input-id="id" :binary="true" /></td>
  <td class="text-left">
    <label :for="id" :style="`color: #${color}`">{{ label }}</label>
  </td>
  <td><FormColorPicker v-model:value="color" /></td>
  <td class="w-full">
    <InputText
      v-model="memo"
      class="w-full p-inputtext-sm"
      placeholder="足音メモ"
    />
  </td>
</template>

<script setup lang="ts">
// props
interface Props {
  id: string
  label: string
  color: string
  memo: string
  value: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: boolean): boolean
  (e: 'update:color', value: string): string
  (e: 'update:memo', value: string): string
}>()

const value = computed({
  get: () => props.value,
  set: (value: boolean) => emit('update:value', value)
})

const color = computed({
  get: () => props.color,
  set: (color: string) => emit('update:color', color)
})

const memo = computed({
  get: () => props.memo,
  set: (memo: string) => emit('update:memo', memo)
})
</script>

<style lang="scss">
.p-colorpicker-preview {
  width: 1.5rem;
  height: 1.5rem;
  //   padding: 0;
}
</style>
