<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import type { User } from '~/types/models/user'; 

const authStore = useAuthStore();
const errorMessage = ref('');
const loading = ref(false);

// Contacts data
const contacts = ref<User[]>([
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    lastContact: "2024-01-10"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    status: "Inactive",
    lastContact: "2024-01-05"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 246-8135",
    status: "Pending",
    lastContact: "2024-01-15"
  }
])
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const skip = ref(itemsPerPage.value * currentPage.value - itemsPerPage.value);
const totalPages = ref(Math.ceil(totalItems.value / itemsPerPage.value));
const paginationInfo = computed(() => {
  const start = skip.value + 1;
  const end = Math.min(skip.value + itemsPerPage.value, totalItems.value);
  return `Mostrando ${start} - ${end} de ${totalItems.value} itens`;
});

// Action methods
const contactChat = (id: number) => {
  console.log('View contact:', id)
  // Implement view logic
}

const deleteContact = (id: number) => {
  console.log('Delete contact:', id)
  // Implement delete logic
}

// const exportContact = (id: number) => {
//   console.log('Export contact:', id)
//   // Implement export logic
// }
const changePage = (page: number) => {
  currentPage.value = page
  skip.value = itemsPerPage.value * currentPage.value - itemsPerPage.value;
  console.log(skip.value);
  getContacts();
}
const getContacts = async () => {
  const tokenService = useTokenService()
  const token = tokenService.getToken() || authStore.user?.accessToken;
  const config = useRuntimeConfig();
  console.log(skip.value, itemsPerPage.value);
  try {
    const data = await $fetch<User[]>(`/users?limit=${itemsPerPage.value}&skip=${skip.value}`, {
      baseURL: config.public.apiBase,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    contacts.value = data.users;
    totalItems.value = data.total;
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
    return data
  } catch (error: any) {
    errorMessage.value = error.message || 'Erro ao fazer login'
    throw error
  } finally {
    loading.value = false
  }
}

watch(itemsPerPage, (newVal, oldVal) => {
  itemsPerPage.value = newVal;
  getContacts();
});

onMounted(async () => {
  await getContacts();
})
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="flex flex-col h-[75vh]">
    <!-- Tabela com rolagem -->
      <div class="overflow-y-auto flex-1">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Contact Info
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Last Contact
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ contact.firstName + ' ' + contact.lastName}}</h5>
                <p class="text-sm">{{ contact.email }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ contact.phone }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ contact.lastContact ?? "2024-01-15" }}</p>
              </td>
              <td class="py-5 px-4">
                <p
                  class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                  :class="{
                    'bg-success text-success': (contact.status ?? 'Inactive') === 'Active',
                    'bg-danger text-danger': (contact.status ?? 'Inactive') === 'Inactive',
                    'bg-warning text-warning': (contact.status ?? 'Inactive') === 'Pending'
                  }"
                >
                  {{ contact.status ?? 'Inactive' }}
                </p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <button class="hover:text-primary" @click="contactChat(contact.id)">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1.5C4.8555 1.5 1.5 4.41525 1.5 7.99425C1.5 9.56625 2.11575 11.0252 3.19125 12.1942C2.94825 13.3762 2.115 14.4487 2.10075 14.4652C2.00325 14.5882 1.989 14.7517 2.0655 14.8867C2.142 15.0217 2.29575 15.1027 2.46 15.0982C4.239 15.0757 5.634 14.3557 6.3795 13.8652C7.2165 14.1577 8.10675 14.3177 9 14.3177C13.1445 14.3177 16.5 11.4045 16.5 7.99425C16.5 4.41525 13.1445 1.5 9 1.5ZM9 13.0677C8.19225 13.0677 7.38825 12.9232 6.633 12.6397C6.54825 12.6082 6.45675 12.5957 6.366 12.6037C6.27525 12.6127 6.189 12.6442 6.11475 12.6952C5.41425 13.2037 4.383 13.7492 3.162 13.8997C3.49575 13.3297 3.99225 12.4522 4.17525 11.5612C4.2075 11.4307 4.17975 11.2957 4.10025 11.1877C3.126 10.1722 2.75 9.11925 2.75 7.99425C2.75 5.03925 5.57475 2.75 9 2.75C12.4253 2.75 15.25 5.03925 15.25 7.99425C15.25 10.9492 12.4253 13.0677 9 13.0677Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5.75 7.75C5.75 7.40482 5.46968 7.125 5.125 7.125C4.78032 7.125 4.5 7.40482 4.5 7.75C4.5 8.09518 4.78032 8.375 5.125 8.375C5.46968 8.375 5.75 8.09518 5.75 7.75Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9.75 7.75C9.75 7.40482 9.46968 7.125 9.125 7.125C8.78032 7.125 8.5 7.40482 8.5 7.75C8.5 8.09518 8.78032 8.375 9.125 8.375C9.46968 8.375 9.75 8.09518 9.75 7.75Z"
                        fill="currentColor"
                      />
                      <path
                        d="M13.75 7.75C13.75 7.40482 13.4697 7.125 13.125 7.125C12.7803 7.125 12.5 7.40482 12.5 7.75C12.5 8.09518 12.7803 8.375 13.125 8.375C13.4697 8.375 13.75 8.09518 13.75 7.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
  
                  <button class="hover:text-primary" @click="deleteContact(contact.id)">
                    <svg
                      class="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                    </svg>
                  </button>
  
                  <!-- <button class="hover:text-primary" @click="exportContact(contact.id)">
                    <svg
                      class="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                        fill=""
                      />
                      <path
                        d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                        fill=""
                      />
                    </svg>
                  </button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="flex flex-wrap items-center justify-between py-4 px-4">
        <div class="flex items-center space-x-2">
          <span class="text-gray-600 dark:text-gray-400">
            {{ paginationInfo }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <template v-for="page in totalPages" :key="page">
            <button 
              @click="changePage(page)"
              class="px-3 py-1 rounded-md border"
              :class="{
                'bg-primary text-white': currentPage === page,
                'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700': currentPage !== page
              }"
            >
              {{ page }}
            </button>
          </template>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-600 dark:text-gray-400">Itens por página:</span>
          <select 
            v-model="itemsPerPage"
            class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <option selected value="10">10</option> 
            <option value="20">20</option>
            <option value="50">50</option> 
            <option value="300">300</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
