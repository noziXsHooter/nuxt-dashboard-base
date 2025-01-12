<template>
  <NuxtLayout name="auth">
    <template #title>Crie sua conta</template>

    <form class="space-y-6" @submit.prevent="handleRegister">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Nome completo
        </label>
        <div class="mt-1">
          <input id="name" v-model="form.name" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div class="mt-1">
          <input id="email" v-model="form.email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <div class="mt-1">
          <input id="password" v-model="form.password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
          Confirme a senha
        </label>
        <div class="mt-1">
          <input id="password_confirmation" v-model="form.password_confirmation" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div class="flex items-center">
        <input id="terms" v-model="form.terms" type="checkbox" required
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
        <label for="terms" class="ml-2 block text-sm text-gray-900">
          Eu aceito os
          <NuxtLink to="/terms" class="font-medium text-blue-600 hover:text-blue-500">
            termos de serviço
          </NuxtLink>
          e a
          <NuxtLink to="/privacy" class="font-medium text-blue-600 hover:text-blue-500">
            política de privacidade
          </NuxtLink>
        </label>
      </div>

      <div>
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Criar conta
        </button>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600">
        Já tem uma conta?
        <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Faça login
        </NuxtLink>
      </p>
    </form>
  </NuxtLayout>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false
})

const handleRegister = async () => {
  try {
    // Implemente a lógica de registro aqui
    console.log('Registro:', form.value)
  } catch (error) {
    console.error('Erro no registro:', error)
  }
}
</script>