interface TokenService {
    getToken: () => string | null
    setToken: (token: string) => void
    removeToken: () => void
    hasToken: () => boolean
  }
  
  export const useTokenService = (): TokenService => {
    const TOKEN_KEY = 'token'
  
    const getToken = (): string | null => {
      if (import.meta.server) return null
      return localStorage.getItem(TOKEN_KEY)
    }
  
    const setToken = (token: string): void => {
      if (import.meta.server) return
      localStorage.setItem(TOKEN_KEY, token)
    }
  
    const removeToken = (): void => {
      if (import.meta.server) return
      localStorage.removeItem(TOKEN_KEY)
    }
  
    const hasToken = (): boolean => {
      if (import.meta.server) return false
      return !!localStorage.getItem(TOKEN_KEY)
    }
  
    return {
      getToken,
      setToken,
      removeToken,
      hasToken
    }
  }