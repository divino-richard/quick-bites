<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import FoodCardsSkeleton from "@/components/skeletons/FoodCardsSkeleton.vue";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { Search, ShoppingCart } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import Header from "@/components/customer/Header.vue";

const store = useStore();

const loadingFoods = computed(() => store.state.getFoodMenuLoading);
const foods = computed(() => store.state.foods);

const foodsSkip = ref(0);

const foodsLimit = 10;

onMounted(() => {
  store.dispatch("getFoodMenus", { skip: foodsSkip, limit: foodsLimit });
});
</script>

<template>
  <div class="bg-zinc-50 min-h-screen space-y-5">
    <Header />

    <div class="w-full max-w-[1250px] m-auto space-y-5">
      <div
        class="flex items-center border border-zinc-100 w-[400px] rounded-md bg-white p-[10px] space-x-2"
      >
        <Search :size="18" />
        <Input
          placeholder="Search a foods"
          class="font-medium border-none focus-visible:ring-0 focus-visible:ring-white p-0 h-fit"
        />
      </div>
      <div v-if="foods" class="grid grid-cols-5 gap-5">
        <div
          v-for="(food, index) in foods"
          :key="index"
          class="border border-zinc-100 rounded-md p-2 bg-white"
        >
          <img :src="food.image" alt="food" class="w-full h-[125px] object-cover" />
          <div class="p-2">
            <h1 class="font-medium text-zinc-600">{{ food.name }}</h1>
            <h2 class="text-orange-500">
              ₱ <span class="text-lg font-bold">{{ food.price }}</span>
            </h2>
            <Button class="w-full h-[35px] space-x-2 mt-2">
              <ShoppingCart :size="20" class="text-orange-500" />
              <span class="text-[14px]">Order now</span>
            </Button>
          </div>
        </div>
      </div>
      <FoodCardsSkeleton v-if="loadingFoods" />
    </div>
  </div>
</template>
