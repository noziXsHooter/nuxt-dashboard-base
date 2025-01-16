<script setup>
definePageMeta({
  title: 'Settings',
  layout: 'dashboard',
})
import { ref } from 'vue'
import SettingsCard from '~/components/SettingsCard.vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CardContainer from '~/components/Cards/CardContainer.vue';

const pageTitle = ref('Settings')
</script>

<template>

    <CardContainer customClass="max-w-125">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <SettingsCard />
    </CardContainer>

</template>
