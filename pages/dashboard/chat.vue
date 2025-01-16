<script setup>
definePageMeta({
  title: 'Chat',
  layout: 'dashboard',
})
import { ref } from 'vue'
import ChatCard from '~/components/ChatCard.vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CardContainer from '~/components/Cards/CardContainer.vue';

const pageTitle = ref('Chat')
</script>

<template>
    <CardContainer customClass="h-[75vh]">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <ChatCard />
    </CardContainer>
</template>
