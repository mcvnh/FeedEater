<script setup lang="ts">
defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="border-b border-gray-200 py-4 last:border-0">
    <h3>
      <a :href="article.link" class="font-bold hover:underline" target="_blank" rel="noopener">
        {{ article.title }}
      </a>
      <span v-if="article.pubDate" class="font-light text-xs mt-1 ml-2">{{ diffTime(new Date(article.pubDate)) }}</span>
    </h3>
    <p class="text-sm">
      {{ article.description }}
    </p>
  </article>
</template>