<script setup lang="ts">
import { useFetch, useRoute } from 'nuxt/app'
import { computed } from 'vue'

const { data: feeds } = await useFetch('/api/feeds')

const route = useRoute()
const isRoutePage = computed(() => {
  return route.name === 'index'
})
</script>

<template>
  <aside class="flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <div v-if="isRoutePage" class="text-lg tracking-wide font-bold leading-none">
          <a href="/">
            FeedEater
          </a>
        </div>
        <div v-else class="text-sm font-bold mb-2">
          <NuxtLink to="/" class="hover:underline flex items-center">
            <UIcon name="i-lucide-arrow-left" class="inline-block mr-1" />
            back
          </NuxtLink>
        </div>
      </div>
    </div>

    <ul>
      <li v-for="feed in feeds" :key="feed.name" class="border-b border-gray-200 py-4 last:border-0">
        <div>
          <div class="font-bold text-sm leading-[160%]">
            <NuxtLink :to="`/feed/${feed.name}`" class="hover:underline">
              {{ feed.name }}
            </NuxtLink>
          </div>
          <div class="text-xs mt-1">{{ feed.url }}</div>

        </div>
      </li>
    </ul>
  </aside>
</template>