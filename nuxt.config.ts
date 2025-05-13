// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-19',
  devtools: { enabled: true },

  app: {
    head: {
      title: "FeedEater",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ]
    }
  },

  css: [
    './layers/base/assets/font-faces.css',
    './layers/base/assets/main.css',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxthub/core'
  ],

  nitro: {
    experimental: {
      openAPI: true,
      tasks: true
    },
    scheduledTasks: {
      '0 */1 * * *': ['articles:update'],
    }
  },

  hub: {
    kv: true,
    database: true,
    bindings: {
      observability: {
        logs: true
      }
    }
  }
})