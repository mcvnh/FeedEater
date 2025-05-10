<script setup lang="ts">
const route = useRoute()
const { data: articles } = useFetch('/api/articles/' + route.params.name)
</script>

<template>
  <div>
    <ArticleCard v-for="(article, index) in articles" :key="index" :article="article" />
  </div>
</template>