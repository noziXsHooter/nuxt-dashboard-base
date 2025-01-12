import { useAuthStore } from "~/stores/auth"

export function useAuth() {
    const auth = useAuthStore()
    const router = useRouter()
  
    const loginWithCredentials = async (username: string, password: string) => {
      try {
        await auth.login(username, password)
        router.push('/dashboard')
      } catch (error) {
        return error
      }
    }
  
    return {
      loginWithCredentials,
      logout: auth.logout,
      register: auth.register,
      isAuthenticated: computed(() => auth.isAuthenticated),
      user: computed(() => auth.user),
      loading: computed(() => auth.loading),
      error: computed(() => auth.error)
    }
  }
  