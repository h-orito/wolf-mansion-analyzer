<template>
  <div class="flex flex-column h-full wrapper">
    <LayoutDefaultHeader />
    <div
      class="flex-1 p-2 sm:p-3 w-full max-w-full mx-auto h-full overflow-auto"
    >
      <slot />
    </div>
    <LayoutDefaultFooter />
  </div>
</template>
