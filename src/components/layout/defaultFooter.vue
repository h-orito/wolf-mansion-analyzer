<template>
  <footer class="w-full p-2 border-top-1 border-bluegray-200 text-xs">
    <div class="flex justify-content-center gap-2">
      <NuxtLink
        to="https://twitter.com/ort_dev"
        target="_blank"
        rel="noreferrer"
      >
        <Button icon="pi pi-twitter" class="p-button-rounded p-button-info" />
      </NuxtLink>
      <NuxtLink
        to="https://github.com/h-orito/wolf-mansion-analyzer"
        target="_blank"
        rel="noreferrer"
      >
        <Button icon="pi pi-github" class="p-button-rounded p-button-info" />
      </NuxtLink>
    </div>
    <div class="flex justify-content-center mt-2">© 2022- ort</div>
  </footer>
</template>

<script setup lang="ts"></script>
