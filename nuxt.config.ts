// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
  //  typeCheck: false, //To enable type-checking at build or development time
   // strict: true, // If you are currently converting your codebase to TypeScript, you may want to temporarily disable strict checks
  },

  hooks: {
    'pages:extend'(pages: NuxtPage[]) {
      const publicRoutes = [''];

      function setMeta(pages: NuxtPage[]) {
        for (const page of pages) {
          // Define middleware para rotas que começam com `/dashboard`
          if (page.path.startsWith('/dashboard')) {
            page.meta ||= {}
            page.meta.middleware = ['auth']
          }

          // Define `requiresAuth: false` para rotas específicas
          if (publicRoutes.includes(page.path)) {
            page.meta ||= {}
            page.meta.requiresAuth = false
          }

          // Recursivamente configurar metadados para rotas filhas
          if (page.children) {
            setMeta(page.children)
          }
        }
      }

      setMeta(pages)
    },
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: 'https://dummyjson.com'
    }
  }
})