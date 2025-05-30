<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage :key="route.fullPath" />
    </UApp>
  </NuxtLayout>
</template>
