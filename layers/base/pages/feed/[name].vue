<script setup lang="ts">
const route = useRoute();

const page = parseInt(route.query.page as string, 10) || 1;
const perPage = route.query.perPage || 20;

const { data } = await useFetch(`/api/articles/${route.params.name}`, {
  params: {
    page,
    perPage,
    search: route.query.search,
  },
});

const articles = data.value.articles || [];
const pagination = data.value.pagination || {};

const total = ref(pagination.totalCount || 0);

const updatePage = (newPage: number) => {
  return navigateTo({
    query: {
      ...useRoute().query,
      page: newPage,
      search: undefined,
    },
    replace: true,
  });
};
</script>

<template>
  <div>
    <ArticleCard v-for="(article, index) in articles" :key="index" :article="article" />

    <div class="my-6 flex justify-center">
      <UPagination
        v-if="total > 20"
        v-model:page="page"
        :total="total"
        :items-per-page="20"
        @update:page="updatePage"
      />
    </div>
  </div>
</template>
