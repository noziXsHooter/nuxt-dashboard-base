<script setup lang="ts">
const props = defineProps(['pageTitle'])
const { user } = useAuth()
</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-title-md2 font-semibold text-gray-600 dark:text-gray-400e">
      {{ props.pageTitle }}
    </h2>

    <nav>
      <ol class="flex items-center gap-2">
        <li>
          <router-link class="font-medium" to="/dashboard"> Dashboard / </router-link>
        </li>
        <li class="font-medium text-primary">{{ props.pageTitle }}</li>
      </ol>
    </nav>
  </div>
</template>
