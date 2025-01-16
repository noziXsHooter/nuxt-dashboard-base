<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode'

const darkModeStore = useDarkModeStore()

// Configurações reativas do usuário
const userDashboardSettings = ref<any>({
  showThemeToggle: true,
  notificationsEnabled: true,
  darkMode: darkModeStore.darkMode,
  displayLanguage: 'English',
  itemsPerPage: 10,
})

onMounted(() => {
  // Simula carregar as configurações do usuário de uma API ou localStorage
  console.log('Configurações carregadas:', userDashboardSettings.value)
})

function updateDarkModeState() {
  darkModeStore.toggleDarkMode();
}

// Atualiza a configuração específica
function updateSetting(key: keyof typeof userDashboardSettings.value, value: any) {
  userDashboardSettings.value[key] = value
}
</script>

<template>
  <div
    class="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
    <!-- Título -->
    <h2 class="text-lg font-semibold mb-4 dark:text-white">Configurações do Dashboard</h2>

    <!-- Configuração: Notificações -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm dark:text-gray-300">Notification</span>
      <div class="relative">
        <input id="show-notification" type="checkbox" class="sr-only"
          @change="updateSetting('notificationsEnabled', ($event.target as HTMLInputElement).checked)"
          :checked="userDashboardSettings.notificationsEnabled" />
        <div 
        class="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]">
      </div>
        <div 
        :class="userDashboardSettings.notificationsEnabled && '!right-0 !translate-x-full !bg-primary dark:!bg-white'"
          class="dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition"
          @click="userDashboardSettings.notificationsEnabled = !userDashboardSettings.notificationsEnabled"></div>
      </div>

      <!-- <input type="checkbox" class="toggle-checkbox" :checked="userDashboardSettings.notificationsEnabled"
        @change="updateSetting('notificationsEnabled', ($event.target as HTMLInputElement).checked)" /> -->

    </div>

    <!-- Configuração: Tema Escuro -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm dark:text-gray-300">Dark Mode</span>
      <div class="relative">
        <input id="show-notification" type="checkbox" class="sr-only"
          @change="updateSetting('notificationsEnabled', ($event.target as HTMLInputElement).checked)"
          :checked="darkModeStore.darkMode" />
        <div 
        class="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]">
      </div>
        <div 
        :class="darkModeStore.darkMode && '!right-0 !translate-x-full !bg-primary dark:!bg-white'"
          class="dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition"
          @click="updateDarkModeState()"></div>
      </div>
    </div>

    <!-- Configuração: Idioma -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm dark:text-gray-300">Language</span>
      <select class="rounded border-gray-300 dark:bg-gray-700 dark:text-white p-1"
        v-model="userDashboardSettings.displayLanguage">
        <option value="English">English</option>
        <option value="Portuguese">Português</option>
        <option value="Spanish">Español</option>
      </select>
    </div>

    <!-- Configuração: Itens por página -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm dark:text-gray-300">Items per page</span>
      <input type="number" class="w-16 rounded border-gray-300 dark:bg-gray-700 dark:text-white"
        v-model.number="userDashboardSettings.itemsPerPage" min="1" />
    </div>

    <!-- Configuração: Mostrar Toggle de Tema -->
    <div class="flex items-center justify-between">
      <span class="text-sm dark:text-gray-300">Show Toggle Theme</span>
      <div class="relative">
        <input id="show-toggle-theme" type="checkbox" class="sr-only"
          @change="updateSetting('showThemeToggle', ($event.target as HTMLInputElement).checked)"
          :checked="darkModeStore.showHeaderDarkModeToggle" />
        <div 
        class="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]">
      </div>
        <div 
          :class="darkModeStore.showHeaderDarkModeToggle && '!right-0 !translate-x-full !bg-primary dark:!bg-white'"
          class="dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition"
          @click="darkModeStore.updateShowHeaderDarkModeToggle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle-checkbox {
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.toggle-checkbox:checked {
  background-color: #4caf50;
}

.toggle-checkbox:before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-checkbox:checked:before {
  transform: translateX(20px);
}
</style>
