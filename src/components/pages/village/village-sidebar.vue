<template>
  <div class="sidebar" :class="isExpanded ? 'is-active' : ''">
    <div v-if="isExpanded">
      <ul class="sidebar-menu text-base">
        <li v-if="player" class="py-3">
          <i class="pi pi-user mr-3"></i>{{ player.name }}
        </li>
        <li v-if="player" class="cursor-pointer py-3" @click="logout">
          <i class="pi pi-user-minus mr-3"></i>ログアウト
        </li>
        <li class="cursor-pointer py-3" @click="$emit('clear-village')">
          <i class="pi pi-folder-open mr-3"></i>村変更
        </li>
        <li class="cursor-pointer py-3" @click="$emit('open-instruction')">
          <i class="pi pi-book mr-3"></i>説明書
        </li>
        <li v-if="village" class="cursor-pointer py-3" @click="openMansion">
          <i class="pi pi-external-link mr-3"></i>本家を開く
        </li>
        <li
          v-if="village && isProgress"
          class="cursor-pointer py-3"
          @click="$emit('refresh-village')"
        >
          <i class="pi pi-refresh mr-3"></i>村状況更新
        </li>
      </ul>
    </div>
  </div>
  <div
    class="outside"
    :class="isExpanded ? 'is-active' : ''"
    @click="$emit('close')"
  ></div>
</template>

<script setup lang="ts">
import { logoutPlayer } from '~/components/auth/auth-cookie'

interface Props {
  isExpanded: boolean
}
defineProps<Props>()

interface Emits {
  (e: 'clear-village'): void
  (e: 'open-instruction'): void
  (e: 'refresh-village'): void
  (e: 'close'): void
}
defineEmits<Emits>()

const player = usePlayer()
const logout = () => {
  usePlayer(null, true)
  logoutPlayer()
  location.reload()
}

const village = computed(() => useVillage().value)
const openMansion = () => {
  window.open(`https://wolfort.net/wolf-mansion/village/${village.value?.id}`)
}
const isProgress = computed(() => village.value?.status.code === 'IN_PROGRESS')
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  height: 100vh;
  width: 0;
  transition-property: all;
  transition-duration: 200ms;
  transition-delay: 0s;
  transition-timing-function: ease;

  &.is-active {
    display: block;
    background-color: var(--bluegray-900);
    width: 280px;
    padding: 10px;
  }

  .sidebar-menu {
    list-style: none;
    text-align: left;
    padding-left: 10px;
  }
}

.outside {
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  background-color: hsla(0, 0%, 21%, 0.8);
  height: 100vh;
  width: calc(100% - 280px);

  &.is-active {
    display: block;
    z-index: 20;
  }
}
</style>
