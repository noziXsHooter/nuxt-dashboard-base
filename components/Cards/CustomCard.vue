<script setup lang="ts">
defineOptions({
  name: 'CustomCard'
})

const props = defineProps({
    cardTitle: {
        type: String,
        required: true,
        default: '',
    }
})

</script>

<template>
    <div
        class="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <!-- Título -->
        <h2 class="text-lg font-semibold mb-4 dark:text-white">{{ props.cardTitle }}</h2>

        <slot />
    </div>
</template>
