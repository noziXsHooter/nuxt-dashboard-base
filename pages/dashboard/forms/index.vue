<script setup>
definePageMeta({
  title: 'Forms',
  layout: 'dashboard',
})

const pageTitle = ref('Forms')
onMounted(() => {
  return navigateTo('/dashboard/forms/form-elements'); // Redireciona para a primeira rota filha
});
</script>

<template>

</template>
