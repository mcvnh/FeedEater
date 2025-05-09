<script setup lang="ts">
const { data: articles } = useFetch('/api/articles')
</script>
<template>
  <div>
    <article v-for="(article, index) in articles" :key="index" class="border-b border-gray-200 py-4 last:border-0">
        <h3>
          <a :href="article.link" class="font-bold hover:underline" target="_blank" rel="noopener">
            {{ article.title }}
          </a>
        </h3>
        <p class="text-sm">
          {{ article.description }}
        </p>
    </article>
  </div>
</template>