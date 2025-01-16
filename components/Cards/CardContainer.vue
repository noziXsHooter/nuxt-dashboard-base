<template>
    <div :class="computedClasses">
        <slot />
    </div>
</template>

<script setup>
defineOptions({
  name: 'CardContainer'
})

const props = defineProps({
    customClass: {
    type: String,
    default: '',
  },
});

const computedClasses = computed(() => `mx-auto ${props.customClass}`.trim());
</script>
