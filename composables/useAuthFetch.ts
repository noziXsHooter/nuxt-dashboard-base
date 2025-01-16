export const useAuthFetch = () => {
    const tokenService = useTokenService()
    const config = useRuntimeConfig()
  
    return async <T>(url: string, opts: any = {}): Promise<T> => {
      const token = tokenService.getToken()
  
      const headers = {
        ...opts.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
  
      return $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...opts,
        headers
      })
    }
  }