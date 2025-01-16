import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useDarkModeStore = defineStore('darkMode', () => {
  const darkMode = useStorage('darkMode', ref(false))
  const showHeaderDarkModeToggle = useStorage('showHeaderDarkModeToggle', ref(true))
  
  document.documentElement.classList.toggle('dark', darkMode.value)

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  function updateShowHeaderDarkModeToggle() {
    showHeaderDarkModeToggle.value = !showHeaderDarkModeToggle.value
    console.log('update');
  }

  return { 
    darkMode,
    toggleDarkMode, 
    showHeaderDarkModeToggle,
    updateShowHeaderDarkModeToggle,
  }
})
