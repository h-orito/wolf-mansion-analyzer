<template>
  <div
    ref="splitterContainer"
    class="flex h-full w-full"
    :class="`${direction === 'column' ? 'flex-column' : ''}`"
  >
    <div
      ref="firstContainer"
      :class="`${direction === 'row' ? 'h-full' : 'w-full'}`"
    >
      <slot name="first" />
    </div>
    <hr
      class="border-1 mx-2 cursor-pointer hover:border-white"
      :class="`${grabbed ? 'border-white' : 'border-gray-500'}`"
      @mousedown="grab"
    />
    <div
      ref="secondContainer"
      :class="`${direction === 'row' ? 'h-full' : 'w-full'}`"
    >
      <slot name="second" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  direction: string
  size?: number
  baseSelector?: string
}
const props = defineProps<Props>()

const grabbed = ref(false)

const splitterContainer = ref()
const firstContainer = ref()
const secondContainer = ref()

onMounted(() => {
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', mouseup)

  const initialSize = props.size || 50
  if (props.direction === 'row') {
    firstContainer.value.style = `width: ${initialSize}%`
    secondContainer.value.style = `width: calc(${100 - initialSize}% - 16px)`
  } else {
    firstContainer.value.style = `height: ${initialSize}%`
    secondContainer.value.style = `height: calc(${100 - initialSize}% - 32px)`
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', move)
  window.removeEventListener('mouseup', mouseup)
})

const grab = (event: any) => {
  grabbed.value = true
  event.preventDefault()
}

const mouseup = () => {
  grabbed.value = false
}

const move = (event: any) => {
  if (!grabbed.value) return
  const { x, y } = splitterContainer.value.getBoundingClientRect()
  if (props.direction === 'row') {
    const containerWidth = container.value.clientWidth
    const width = event.clientX - x
    const firstPercent = (width * 100) / containerWidth
    const secondPercent = 100 - firstPercent
    firstContainer.value.style = `width: ${firstPercent}%`
    secondContainer.value.style = `width: calc(${secondPercent}% - 16px)`
  } else {
    const containerHeight = container.value.clientHeight
    let height = event.clientY - y
    if (height < 0) height = 0
    const firstPercent = (height * 100) / containerHeight
    const secondPercent = 100 - firstPercent
    firstContainer.value.style = `height: ${firstPercent}%`
    secondContainer.value.style = `height: calc(${secondPercent}% - 32px)`
  }
}

const container = computed(() => {
  if (props.baseSelector) return document.querySelector(props.baseSelector)
  else return splitterContainer.value
})
</script>
