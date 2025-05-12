<script setup lang="ts">
const reload = async () => {
  await useFetch('/api/update')
  window.location.reload()
}
</script>

<template>
  <div class="flex">
    <div class="p-4 border-r border-gray-200 min-h-screen w-sm min-w-sm hidden lg:block">
      <Sidebar />
    </div>
    <div class="p-4 max-w-3xl">
      <UButton loading-auto icon="i-lucide-refresh-cw" class="cursor-pointer lg:hidden" @click="reload">
        <span class="sr-only">Refresh</span>
      </UButton>
      <slot />
    </div>
  </div>
</template>