
<template>
  <div class="flex h-[75vh] w-full gap-4">
     <!-- Conversation List - Full width on mobile, toggleable -->
     <div 
      :class="[
        'w-full md:w-1/3 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
        {'hidden md:block': isChatOpen && isSmallScreen}
      ]"
    >
      <div class="p-4 border-b border-stroke dark:border-strokedark flex justify-between items-center">
        <h2 class="text-xl font-semibold text-black dark:text-white">Conversas</h2>
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar..."
            class="pl-8 pr-4 py-1 text-sm border rounded-full w-40 focus:outline-none focus:border-primary dark:bg-meta-4 dark:border-meta-4"
          />
          <svg
            class="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="overflow-y-auto h-[calc(100%-4rem)]">
        <div
          v-for="chat in filteredConversations"
          :key="chat.id"
          @click="selectChat(chat), resetUnread(chat.id)"
          :class="[
            'p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-meta-4 border-b border-stroke dark:border-strokedark',
            selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-meta-4' : ''
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-meta-4 flex items-center justify-center text-lg font-semibold">
                  {{ getInitials(chat.name) }}
                </div>
                <div
                  :class="[
                    'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                    chat.status === 'online' ? 'bg-success' : 'bg-gray-400'
                  ]"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-black dark:text-white truncate">{{ chat.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ chat.lastMessage }}</p>
              </div>
            </div>
            <div class="text-right ml-2">
              <p class="text-xs text-gray-500">{{ chat.time }}</p>
              <span
                v-if="chat.unread > 0"
                class="inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-primary rounded-full"
              >
                {{ chat.unread }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div 
      :class="[
        'w-full md:w-2/3 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
        {'hidden md:flex': !isChatOpen && isSmallScreen}
      ]"
    >
      <template v-if="selectedChat">
        <div class="p-4 border-b border-stroke dark:border-strokedark flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <!-- Back button on mobile -->
            <button 
              @click="backToList" 
              class="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="relative">
              <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-meta-4 flex items-center justify-center text-lg font-semibold">
                {{ getInitials(selectedChat.name) }}
              </div>
              <div
                :class="[
                  'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                  selectedChat.status === 'online' ? 'bg-success' : 'bg-gray-400'
                ]"
              ></div>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-black dark:text-white">{{ selectedChat.name }}</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ selectedChat.status === 'online' ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
          
          <!-- Additional actions menu -->
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-meta-4 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto">
          <!-- Chat messages placeholder -->
          <div class="space-y-4">
            <div class="flex justify-start">
              <div class="bg-gray-100 dark:bg-meta-4 rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">Hey, how are you?</p>
                <span class="text-xs text-gray-500 mt-1">10:30 AM</span>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">I'm doing great! Thanks for asking.</p>
                <span class="text-xs text-white/80 mt-1">10:31 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-stroke dark:border-strokedark">
          <div class="flex space-x-2">
            <!-- Attachment button -->
            <button class="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <input
              v-model="newMessage"
              type="text"
              placeholder="Digite sua mensagem..."
              class="flex-1 p-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-meta-4 dark:border-meta-4"
              @keyup.enter="sendMessage"
            />
            
            <button
              @click="sendMessage"
              class="p-2 text-white bg-primary rounded-lg hover:bg-primary/80"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex-1 flex items-center justify-center text-gray-500">
          Selecione uma conversa para começar
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const selectedChat = ref<string[]|null>(null);
const newMessage = ref('');
const searchQuery = ref('');
const isChatOpen = ref(false);
const isSmallScreen = ref(false);

const conversations = ref([
  { 
    id: 1, 
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '10:30',
    unread: 2,
    status: 'online'
  },
  { 
    id: 2, 
    name: 'Jane Smith',
    lastMessage: 'Can we schedule a meeting?',
    time: '09:15',
    unread: 0,
    status: 'offline'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    lastMessage: 'The project is ready for review',
    time: 'Yesterday',
    unread: 1,
    status: 'online'
  }
]);

const filteredConversations = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return conversations.value.filter(chat => 
    chat.name.toLowerCase().includes(query) || 
    chat.lastMessage.toLowerCase().includes(query)
  );
});

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const selectChat = (chat: string[]) => {
  selectedChat.value = chat;
  isChatOpen.value = true;
};

const backToList = () => {
  isChatOpen.value = false;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  // Implementar lógica de envio
  console.log('Sending message:', newMessage.value);
  newMessage.value = '';
};

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

const resetUnread = (id: number) => {
  conversations.value.find((chat) => chat.id === id).unread = 0;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<!-- <script setup lang="ts">
import { ref } from 'vue';

const selectedChat = ref(null);
const newMessage = ref('');

const conversations = ref([
  { 
    id: 1, 
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '10:30 AM',
    unread: 2,
    status: 'online'
  },
  { 
    id: 2, 
    name: 'Jane Smith',
    lastMessage: 'Can we schedule a meeting?',
    time: '09:15 AM',
    unread: 0,
    status: 'offline'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    lastMessage: 'The project is ready for review',
    time: 'Yesterday',
    unread: 1,
    status: 'online'
  },
]);

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  // Aqui você implementaria a lógica para enviar a mensagem
  console.log('Sending message:', newMessage.value);
  newMessage.value = '';
};
const resetUnread = (id: number) => {
  conversations.value.find((chat) => chat.id === id).unread = 0;
};
</script> -->