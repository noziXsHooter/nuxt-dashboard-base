<script setup lang="ts">
definePageMeta({
  title: 'Tables',
  layout: 'dashboard',
})
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableOne from '@/components/Tables/TableOne.vue'
import TableTwo from '@/components/Tables/TableTwo.vue'
import TableThree from '@/components/Tables/TableThree.vue'

const pageTitle = ref('Tables')
</script>

<template>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <TableOne />
      <TableTwo />
      <TableThree />
    </div>
</template>
