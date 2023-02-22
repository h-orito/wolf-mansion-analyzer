<template>
  <div
    class="flex justify-content-center align-items-center bg-bluegray-900 w-full"
  >
    <div class="text-left px-2">
      <NuxtLink to="/" class="title-font text-white text-xl"
        >WOLF MANSION ANALYZER</NuxtLink
      >
    </div>
    <div v-if="village">- {{ `${village.id}. ${village.name}` }}</div>
    <div class="ml-auto mr-2 my-auto">
      <a class="cursor-pointer" @click="$emit('clear-village')">村変更</a>
    </div>
    <div class="ml-2 mr-2 my-auto">
      <a class="cursor-pointer" @click="openInstruction()">説明書</a>
    </div>
    <div class="ml-2 mr-2 my-auto">
      <a class="cursor-pointer" @click="openDonation()">投げ銭</a>
    </div>
    <div v-if="player" class="ml-2 mr-2 my-auto">
      <a class="cursor-pointer" @click="logout">ログアウト</a>
      &nbsp;ユーザID: {{ player.name }}
    </div>
    <div v-if="false" class="ml-auto mr-2 my-auto">
      <SelectButton
        v-model="villageLayout"
        :options="layouts"
        option-label="name"
        option-value="code"
        class="layout-select"
      />
    </div>
    <Instruction v-model:show="isShowInstruction" />
    <Donation v-model:show="isShowDonation" />
  </div>
</template>

<script setup lang="ts">
import Instruction from './instruction.vue'
import Donation from './donation.vue'
import { logoutPlayer } from '~/components/auth/auth-cookie'

defineEmits<{
  (e: 'clear-village'): void
}>()

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

const villageLayout = useLayout()

const isShowInstruction = ref(false)
const openInstruction = () => (isShowInstruction.value = true)

const isShowDonation = ref(false)
const openDonation = () => (isShowDonation.value = true)

const player = usePlayer()
const logout = () => {
  usePlayer(null, true)
  logoutPlayer()
  location.reload()
}
</script>

<style lang="scss">
.layout-select {
  .p-button {
    padding: 0.25rem 0.5rem;
  }
}
</style>
