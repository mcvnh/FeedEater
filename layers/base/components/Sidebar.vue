<script setup lang="ts">
const search = ref<string>('')

const { data: feeds } = await useFetch('/api/feeds')
</script>

<template>
  <aside class="flex flex-col">
    <UInput
      v-model="search"
      leading-icon="i-lucide:search"
      placeholder="Article name or description..."
      class="mb-4"

    >
      <template #trailing>
        <div class="flex items-center gap-1">
          <UKbd value="meta" />
          <UKbd value="k" />
        </div>
      </template>
    </UInput>

    <ul>
      <li v-for="feed in feeds" :key="feed.name" class="border-b border-gray-200 py-4 last:border-0">
        <div>
          <div class="font-bold text-sm leading-[160%]">
            <NuxtLink :to="`/feed/${feed.name}`" class="text-blue-500 hover:underline">
              {{ feed.name }}
            </NuxtLink>
          </div>
          <div class="text-xs mt-1">{{ feed.url }}</div>
        </div>
      </li>
    </ul>
  </aside>
</template>