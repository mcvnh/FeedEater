<script setup lang="ts">
const reload = async () => {
  await useFetch('/api/update')
  window.location.reload()
}

const search = ref(useRoute().query.search as string || '');

const updateSearch = () => {
  return navigateTo({
    query: {
      ...useRoute().query,
      page: 1,
      search: search.value
    },
    replace: true,
  });
}
</script>

<template>
  <div class="flex">
    <div class="fixed p-4 border-r bg-gray-100/50 border-gray-200 min-h-screen transition-all duration-300 w-[290px] lg:translate-x-0 -translate-x-full">
      <Sidebar />
    </div>
    <div class="p-4 transition-all duration-300 lg:ml-[290px]">
      <UButton loading-auto icon="i-lucide-refresh-cw" class="cursor-pointer hidden" @click="reload">
        <span class="sr-only">Refresh</span>
      </UButton>

      <div class="border-b border-gray-200 w-full flex justify-between items-center gap-6 pb-4">
        <UInput
          v-model="search"
          leading-icon="i-lucide:search"
          placeholder="article name or description..."
          class="w-full lg:w-[300px]"
          @keyup.enter="updateSearch"
        >
          <!-- <template #trailing>
            <div class="flex items-center gap-1">
              <UKbd value="meta" />
              <UKbd value="k" />
            </div>
          </template> -->
        </UInput>

        <UButton loading-auto icon="i-lucide-refresh-cw" class="cursor-pointer" @click="reload">
          <span class="sr-only">Refresh</span>
        </UButton>
      </div>

      <div class="max-w-3xl">
        <slot />
      </div>
    </div>
  </div>
</template>