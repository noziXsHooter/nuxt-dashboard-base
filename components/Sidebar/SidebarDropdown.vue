<script setup lang="ts">
import { useSidebarStore } from '@/stores/side-bar'
import { ref } from 'vue'

const sidebarStore = useSidebarStore()

const props = defineProps(['items', 'page'])
const items = ref(props.items)

const handleItemClick = (index: number) => {
  const pageName =
    sidebarStore.selected === props.items[index].label ? '' : props.items[index].label
  sidebarStore.selected = pageName
}
</script>

<template>
  <ul class="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
    <template v-for="(childItem, index) in items" :key="index">
      <li>
        <router-link
          :to="childItem.route"
          class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out
            text-graydark dark:text-bodydark
            hover:text-whiten dark:hover:text-gray
            hover:bg-graydark dark:hover:bg-bodydark"
          @click.prevent="handleItemClick(index)"
          :class="{
            'bg-graydark text-whiten dark:bg-boxdark dark:text-gray': sidebarStore.selected === childItem.label,
            'dark:text-bodydark2': sidebarStore.selected !== childItem.label
          }"
        >
          {{ childItem.label }}
        </router-link>
      </li>
    </template>
  </ul>
</template>
