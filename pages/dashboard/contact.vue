<script setup>
definePageMeta({
  title: 'Contacts',
  layout: 'dashboard',
})
import { ref } from 'vue'
import ContactCard from '~/components/ContactCard.vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CardContainer from '~/components/Cards/CardContainer.vue';

const pageTitle = ref('Contacts')
</script>

<template>
    <CardContainer customClass="">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <ContactCard />
    </CardContainer>
</template>
