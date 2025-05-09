<template>
  <div class="flex">
    <div class="p-4 border-r border-gray-200 min-h-screen w-sm min-w-sm hidden lg:block">
      <Sidebar />
    </div>
    <div class="p-4 max-w-3xl">
      <slot />
    </div>
  </div>
</template>