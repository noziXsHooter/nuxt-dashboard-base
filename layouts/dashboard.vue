<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300"
      :class="{ '-translate-x-full': !sidebarStore.isOpen }">
      <div class="h-full px-3 py-4 overflow-y-auto bg-white border-r">
        <div class="flex items-center justify-between mb-5 ps-2">
          <h2 class="text-xl font-semibold">AdminPanel</h2>
          <button @click="sidebarStore.toggle" class="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul class="space-y-2 font-medium">
            <li v-for="(item, index) in menuItems" :key="index">
              <NuxtLink :to="item.path" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                active-class="bg-gray-100">
                <component :is="item.icon" class="w-5 h-5" />
                <span class="ms-3">{{ item.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="transition-all duration-300" :class="[sidebarStore.isOpen ? 'lg:ml-64' : '']">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center">
            <button @click="sidebarStore.toggle" class="p-2 rounded-lg hover:bg-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="ml-4 text-xl font-semibold">{{ currentPage }}</h1>
          </div>

          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            <!-- User Menu -->
            <div class="flex items-center gap-2">
              <!-- <img class="w-8 h-8 rounded-full" src="" alt="User" /> -->
              <span class="text-sm font-medium">{{ user?.firstName }} {{ user?.lastName }}</span>
            </div>

            <button @click="logout" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            active-class="bg-gray-100">
              <span class="mx-2">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   middleware: ["auth"]
// })

import { ref, computed } from 'vue'
import { useSidebarStore } from '~/stores/side-bar'

const sidebarStore = useSidebarStore()
const { logout, user } = useAuth()

const menuItems = ref([
  {
    title: 'Dashboard',
    // path: '/dashboard', 
    icon: 'HomeIcon'
  },
  {
    title: 'Usuários',
    // path: '/dashboard/users', 
    icon: 'UsersIcon'
  },
  {
    title: 'Produtos',
    // path: '/dashboard/products', 
    icon: 'BoxIcon'
  },
  {
    title: 'Pedidos',
    // path: '/dashboard/orders', 
    icon: 'ShoppingCartIcon'
  },
  {
    title: 'Relatórios',
    // path: '/dashboard/reports', 
    icon: 'ChartBarIcon'
  },
  {
    title: 'Configurações',
    // path: '/dashboard/settings', 
    icon: 'CogIcon'
  }
])

const route = useRoute()
const currentPage = computed(() => {
  const currentMenuItem = menuItems.value.find(item => item.path === route.path)
  return currentMenuItem?.title || 'Dashboard'
})
</script>
