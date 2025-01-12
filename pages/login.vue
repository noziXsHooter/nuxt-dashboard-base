<template>
  <NuxtLayout name="auth">
    <template #title>Entre na sua conta</template>

    <form class="space-y-6" @submit.prevent="handleLogin">
      <div v-if="error" class="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
        {{ error }}
      </div>

      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">
          Usuário
        </label>
        <div class="mt-1">
          <input id="username" v-model="form.username" type="text" required :disabled="loading" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <div class="mt-1">
          <input id="password" v-model="form.password" type="password" required :disabled="loading" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <button type="submit" :disabled="loading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
          <span v-if="loading">Carregando...</span>
          <span v-else>Entrar</span>
        </button>
      </div>
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md 
                     shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Sign in with Google</span>
            <!-- Google Icon -->
            Google
          </button>

          <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md 
                     shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Sign in with GitHub</span>
            <!-- GitHub Icon -->
            GitHub
          </button>
        </div>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600">
        Não tem uma conta?
        <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          Registre-se
        </NuxtLink>
      </p>
    </form>
  </NuxtLayout>
</template>

<script setup>
const { loginWithCredentials, loading, error } = useAuth()

const form = ref({
  username: 'emilys',
  password: 'emilyspass'
})

const handleLogin = async () => {
  await loginWithCredentials(form.value.username, form.value.password)
}
</script>