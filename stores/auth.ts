import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    }
  },

  actions: {
    async login(username: string, password: string) {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      
      try {
        const data = await $fetch<User>('/auth/login', {
          baseURL: config.public.apiBase,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { username, password }
        })
      
        this.user = data
        this.isAuthenticated = true
        localStorage.setItem('token', data?.token ?? '')
        
        return data
      } catch (error: any) {
        this.error = error.message || 'Erro ao fazer login'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData: { 
      username: string
      email: string
      password: string
      firstName: string
      lastName: string 
    }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao registrar')
        }

        return data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.logout()
        return
      }

      try {
        const response = await fetch('https://dummyjson.com/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Sessão expirada')
        }

        const data = await response.json()
        this.user = data
        this.isAuthenticated = true
      } catch {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      navigateTo('/login')
    }
  },
})