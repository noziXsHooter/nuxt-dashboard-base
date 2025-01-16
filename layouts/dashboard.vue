<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <SidebarArea />
    <!-- Main Content -->
    <div class="transition-all duration-300" :class="[sidebarStore.isOpen ? 'lg:ml-64' : '']">
      <!-- Header -->
      <HeaderArea />
      <!-- Page Content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   requiresAuth: false
// })
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
import HeaderArea from '@/components/Header/HeaderArea.vue'
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
