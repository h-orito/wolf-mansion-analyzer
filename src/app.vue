<template>
  <div class="text-xs sm:text-sm container">
    <client-only>
      <NuxtLayout>
        <NuxtPage />
        <ConfirmDialog></ConfirmDialog>
      </NuxtLayout>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<style lang="scss">
@import 'primeflex/primeflex.scss';

@media screen and (min-width: $lg) {
  .max-w-lg {
    max-width: $lg;
  }
}
</style>
