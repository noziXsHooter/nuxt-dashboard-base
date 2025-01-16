<template>
  <div class="min-h-screen bg-gray-100">

    <!-- Dashboard Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <h3 class="text-2xl font-bold">{{ stat.value }}</h3>
            <p class="text-sm" :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'">
              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% desde último mês
            </p>
          </div>
          <div :class="`p-3 rounded-full ${stat.bgColor}`">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Atividades Recentes</h3>
        <div class="space-y-4">
          <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-start gap-4">
            <div :class="`p-2 rounded-full ${activity.bgColor}`">
              <component :is="activity.icon" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="font-medium">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Visão Geral de Vendas</h3>
        <!-- Placeholder for chart - You would typically use a charting library here -->
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <span class="text-gray-500">Gráfico de Vendas</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Dashboard',
  layout: 'dashboard',
})
import { ref } from 'vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const menuItems = ref([
  { title: 'Dashboard', path: '#', icon: 'HomeIcon' },
  { title: 'Usuários', path: '#', icon: 'UsersIcon' },
  { title: 'Produtos', path: '#', icon: 'BoxIcon' },
  { title: 'Pedidos', path: '#', icon: 'ShoppingCartIcon' },
  { title: 'Relatórios', path: '#', icon: 'ChartBarIcon' },
  { title: 'Configurações', path: '#', icon: 'CogIcon' }
])

const stats = ref([
  {
    title: 'Total de Vendas',
    value: 'R$ 54.350',
    trend: 12.5,
    bgColor: 'bg-blue-500',
    icon: 'CurrencyDollarIcon'
  },
  {
    title: 'Novos Usuários',
    value: '2,450',
    trend: 5.6,
    bgColor: 'bg-green-500',
    icon: 'UsersIcon'
  },
  {
    title: 'Total de Pedidos',
    value: '456',
    trend: -2.3,
    bgColor: 'bg-purple-500',
    icon: 'ShoppingBagIcon'
  },
  {
    title: 'Média de Vendas',
    value: 'R$ 1,250',
    trend: 8.2,
    bgColor: 'bg-orange-500',
    icon: 'ChartBarIcon'
  }
])

const recentActivities = ref([
  {
    title: 'Novo pedido #1234',
    time: 'Há 5 minutos',
    bgColor: 'bg-blue-500',
    icon: 'ShoppingCartIcon'
  },
  {
    title: 'Pagamento confirmado',
    time: 'Há 15 minutos',
    bgColor: 'bg-green-500',
    icon: 'CheckCircleIcon'
  },
  {
    title: 'Novo usuário registrado',
    time: 'Há 30 minutos',
    bgColor: 'bg-purple-500',
    icon: 'UserPlusIcon'
  },
  {
    title: 'Produto atualizado',
    time: 'Há 1 hora',
    bgColor: 'bg-orange-500',
    icon: 'RefreshIcon'
  }
])
</script>
