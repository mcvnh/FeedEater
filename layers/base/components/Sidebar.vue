<script setup lang="ts">
const search = ref<string>('')

const feeds = [
  {
    id: '1',
    name: 'Feed 1',
    url: 'https://example.com/feed1.xml',
  },
  {
    id: '2',
    name: 'Feed 2',
    url: 'https://example.com/feed2.xml',
  },
]
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
      <li v-for="feed in feeds" :key="feed.id" class="border-b border-gray-200 py-4 last:border-0">
        <div>
          <div class="font-bold text-sm leading-[160%]">{{ feed.name }}</div>
          <div class="text-xs mt-1">{{ feed.url }}</div>
        </div>
      </li>
    </ul>
  </aside>
</template>