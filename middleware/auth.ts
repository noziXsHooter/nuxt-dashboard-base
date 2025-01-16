import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore()

    // Verifica se existe token no localStorage
    const token = useTokenService().getToken()
    
    // Se tem token mas não está autenticado no store, tenta revalidar
    if (token && !auth.isAuthenticated) {
      console.log('entrou');
      try {
        await auth.checkAuth()
      } catch (error) {
        console.log(error);
        auth.logout()
       // return navigateTo('/login')
      }
    }
  // Verificar se a rota exige autenticação
  const requiresAuth = to.meta.requiresAuth ?? true

  if (import.meta.client) {
    if (requiresAuth && !auth.isAuthenticated) {
      return navigateTo('/login')
    }
    // Redirecionar usuário autenticado tentando acessar páginas de login/registro
    if (auth.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
      return navigateTo('/dashboard')
    }
  }


  // if (!auth.isAuthenticated && to.path !== '/login' && to.path !== '/register') {
  //   return navigateTo('/login')
  // }

  // if (auth.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
  //   return navigateTo('/dashboard')
  // }
})