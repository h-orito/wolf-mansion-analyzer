<template>
  <Password
    :id="id"
    v-model="value"
    class="p-inputtext-sm"
    :class="hasError && 'p-invalid'"
    :feedback="false"
    :toggle-mask="true"
  />
</template>

<script setup lang="ts">
interface Props {
  id?: string
  value: string
  hasError: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: string): string
}>()

const value = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value)
})
</script>
