<script setup lang="ts">
import { useStore } from '@/store';
import { computed, onMounted, ref } from 'vue';
import FoodCardsSkeleton from '../skeletons/FoodCardsSkeleton.vue';
import { Heart } from 'lucide-vue-next';
import MenuModal from './MenuModal.vue';

const store = useStore();

const openModal = ref(false);
const selectedMenu = ref();

const loadingMenus = computed(() => store.state.menu.loadingItems);
const menus = computed(() => store.state.menu.items);

onMounted(() => {
  store.dispatch('menu/getPublicItems');
});

const handleShowMenu = (menu: any) => {
  selectedMenu.value = menu;
  openModal.value = true;
}
</script>

<template>
  <FoodCardsSkeleton v-if="loadingMenus" />
  <div v-else class="grid grid-cols-6 gap-2">
    <div
      v-for="(menu, index) in menus"
      :key="index"
      class="relative border border-zinc- rounded-lg bg-white"
    >
      <div class="absolute top-2 right-2 h-[30px] w-[30px] rounded-full bg-white flex items-center justify-center shadow-sm border border-zinc-100 cursor-pointer">
        <Heart :size="18" color="#EA580C"/>
      </div>
      <img 
        :src="menu?.images?.[0]?.imageUrl" 
        alt="menu" 
        class="w-full h-[200px] rounded-lg object-cover" 
      />
      <div 
        class="absolute bottom-0 w-full bg-zinc-800 backdrop-blur-sm bg-opacity-25 rounded-b-lg p-2 cursor-pointer hover:bg-opacity-60"
        @click="handleShowMenu(menu)"
      > 
        <h1 class="text-[14px] text-white truncate">{{ menu?.name }}</h1>
        <h2 class="text-orange-500">
          <span>{{ menu?.price?.currency }}</span>
          <span class="text-lg font-bold">{{ menu?.price?.value }}</span>
        </h2>
      </div>
    </div>
  </div>
  <MenuModal 
    :openModal="openModal"
    @modalUpdate="(value: boolean) => openModal = value"
    :menu="selectedMenu"
  />
</template>