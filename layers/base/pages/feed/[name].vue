<script setup lang="ts">
const route = useRoute()
const { data: articles } = useFetch('/api/articles/' + route.params.name)
</script>
<template>
  <div>
    <article v-for="(article, index) in articles" :key="index" class="border-b border-gray-200 py-4 last:border-0">
        <h3>
          <a :href="article.link" class="text-blue-500 hover:underline" target="_blank" rel="noopener">
            {{ article.title }}
          </a>
        </h3>
        <p>
          {{ article.description }}
        </p>
    </article>
  </div>
</template>