import { useAuthStore } from "~/stores/auth"  

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    
    // Verificar se a rota exige autenticação
    const requiresAuth = to.meta.requiresAuth ?? true

    if (requiresAuth && !auth.isAuthenticated) {
      return navigateTo('/login')
    }

    // Redirecionar usuário autenticado tentando acessar páginas de login/registro
    if (auth.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
      return navigateTo('/dashboard')
    }

    // if (!auth.isAuthenticated && to.path !== '/login' && to.path !== '/register') {
    //   return navigateTo('/login')
    // }
    
    // if (auth.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    //   return navigateTo('/dashboard')
    // }
})