<script setup lang="ts">
const { data: feeds } = useFetch('/api/feeds')
</script>
<template>
  <div>
    <article v-for="(feed, index) in feeds" :key="index" class="border-b border-gray-200 py-4 last:border-0">

        <h3>
          <a :href="feed.link" class="text-blue-500 hover:underline" target="_blank" rel="noopener">
            {{ feed.title }}
          </a>
        </h3>
        <p>
          {{ feed.description }}
        </p>
    </article>
    {{ feeds.data }}
  </div>
</template>