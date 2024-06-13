<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import FoodCardsSkeleton from "@/components/skeletons/FoodCardsSkeleton.vue";
import { ShoppingCart } from "lucide-vue-next";
import Header from "@/components/customer/Header.vue";
import { computed, onMounted, ref } from "vue";
import { store } from "@/store";

const pagination = ref({ skip: 0, limit: 10});

const loadingMenus = computed(() => store.state.menu.loadingItems);
const menus: any = computed(() => store.state.menu.items);
onMounted(() => {
  store.dispatch('getPublicItems', pagination.value)
});
</script>

<template>
  <div class="bg-white min-h-screen space-y-5">
    <Header />
    <div class="w-full max-w-[1250px] m-auto space-y-5">
      <FoodCardsSkeleton v-if="loadingMenus" />
      <div v-else class="grid grid-cols-5 gap-5">
        <div
          v-for="(menu, index) in menus?.data"
          :key="index"
          class="border border-zinc-100 rounded-md p-2 bg-white"
        >
          <img :src="menu?.images?.[0]?.imageUrl" alt="menu" class="w-full h-[125px] object-cover" />
          <div class="p-2"> 
            <h1 class="font-medium text-zinc-600">{{ menu?.name }}</h1>
            <h2 class="text-orange-500">
              <span>{{ menu?.price?.currency }}</span>
              <span class="text-lg font-bold">{{ menu?.price?.value }}</span>
            </h2>
            <Button class="w-full h-[35px] space-x-2 mt-2">
              <ShoppingCart :size="20" class="text-orange-500" />
              <span class="text-[14px]">Order now</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
