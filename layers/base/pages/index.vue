<script setup lang="ts">
import ArticleCard from '../components/ArticleCard.vue';

const { data: articles } = useFetch('/api/articles')
</script>
<template>
  <div>
    <ArticleCard v-for="(article, index) in articles" :key="index" :article="article" />
  </div>
</template>