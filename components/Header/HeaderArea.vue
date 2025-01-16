<script setup lang="ts">
import { useSidebarStore } from '@/stores/side-bar'
import DarkModeSwitcher from './DarkModeSwitcher.vue'
import DropdownMessage from './DropdownMessage.vue'
import DropdownNotification from './DropdownNotification.vue'
import DropdownUser from './DropdownUser.vue'
import { ref, computed } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode'

const darkModeStore = useDarkModeStore()
const { toggle } = useSidebarStore()
const sidebarStore = useSidebarStore()

const route = useRoute()
const currentPage = computed(() => {
  const currentMenuItem = sidebarStore.menuItems.find(item => item.path === route.path)
  return currentMenuItem?.title || 'Dashboard'
})

const showThemeSwitcher = ref(true)

import userOne from '@/assets/images/user/user-01.png'
import userTwo from '@/assets/images/user/user-02.png'
import userThree from '@/assets/images/user/user-03.png'
import userFour from '@/assets/images/user/user-04.png'

const headerData = ref({
  showThemeSwitcher: computed(() => darkModeStore.showHeaderDarkModeToggle),
  notifications: [
    {
      route: '/dashboard',
      title: 'Edit your information in a swipe',
      details:
        'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
      time: '12 May, 2025'
    },
    {
      route: '/dashboard',
      title: 'It is a long established fact',
      details: 'that a reader will be distracted by the readable.',
      time: '24 Feb, 2025'
    },
    {
      route: '/dashboard',
      title: 'There are many variations',
      details: 'of passages of Lorem Ipsum available, but the majority have suffered',
      time: '04 Jan, 2025'
    },
    {
      route: '/dashboard',
      title: 'There are many variations',
      details: 'of passages of Lorem Ipsum available, but the majority have suffered',
      time: '01 Dec, 2024'
    }
  ],
  chatMessages: [
    {
      route: '/dashboard',
      userImg: userTwo,
      name: 'Mariya Desoja',
      message: 'I like your confidence 💪',
      time: '2min ago'
    },
    {
      route: '/dashboard',
      userImg: userOne,
      name: 'Robert Jhon',
      message: 'Can you share your offer?',
      time: '10min ago'
    },
    {
      route: '/dashboard',
      userImg: userThree,
      name: 'Henry Dholi',
      message: 'I cam across your profile and...',
      time: '1day ago'
    },
    {
      route: '/dashboard',
      userImg: userFour,
      name: 'Cody Fisher',
      message: 'I’m waiting for you response!',
      time: '5day ago'
    },
    {
      route: '/dashboard',
      userImg: userTwo,
      name: 'Mariya Desoja',
      message: 'I like your confidence 💪',
      time: '2min ago'
    }
  ],
});
</script>

<template>
  <header class="sticky top-0 z-30 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
    <div class="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Hamburger Toggle BTN -->
        <button
          class="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          @click="() => {
            console.log('Toggling Sidebar')
            toggle()
          }
            ">
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-300': !sidebarStore.isOpen }"></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-400': !sidebarStore.isOpen }"></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-500': !sidebarStore.isOpen }"></span>
            </span>
            <span class="block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-[0]': !sidebarStore.isOpen }"></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-200': !sidebarStore.isOpen }"></span>
            </span>
          </span>
        </button>
        <h1 class="ml-2 text-xl font-semibold text-graydark dark:text-bodydark">{{ currentPage }}</h1>
      </div>
      <!-- <div class="hidden sm:block">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div class="relative">
            <button class="absolute top-1/2 left-0 -translate-y-1/2">
              <svg
                class="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              class="w-full xl:w-125 bg-transparent pr-4 pl-9 focus:outline-none"
            />
          </div>
        </form>
      </div> -->

      <div class="flex items-center gap-3 2xsm:gap-7">
        <ul class="flex items-center gap-2 2xsm:gap-4">
          <li>
            <!-- Dark Mode Toggler -->
            <DarkModeSwitcher v-if="headerData?.showThemeSwitcher ?? showThemeSwitcher" />
            <!-- Dark Mode Toggler -->
          </li>

          <!-- Notification Menu Area -->
          <DropdownNotification :notifications="headerData.notifications" />
          <!-- Notification Menu Area -->

          <!-- Chat Notification Area -->
          <DropdownMessage :chatMessages="headerData.chatMessages"/>
          <!-- Chat Notification Area -->
        </ul>

        <!-- User Area -->
        <DropdownUser />
        <!-- User Area -->
      </div>
    </div>
  </header>
</template>
