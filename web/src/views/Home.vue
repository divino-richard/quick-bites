<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button/Button.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import FoodCardsSkeleton from "@/components/skeletons/FoodCardsSkeleton.vue";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { Search, ShoppingCart } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const store = useStore();

const session = computed(() => store.getters["auth/getSession"]);
const loadingFoods = computed(() => store.state.getFoodMenuLoading);
const foods = computed(() => store.state.foods);

const foodsSkip = ref(0);

const foodsLimit = 10;

onMounted(() => {
  store.dispatch("getFoodMenus", { skip: foodsSkip, limit: foodsLimit });
});
</script>

<template>
  <div class="bg-zinc-50 min-h-screen">
    <div className="flex justify-between items-center p-5">
      <h1 className="font-semibold text-sm">Quick Bites</h1>

      <div v-if="session">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {{
                  session.userData.firstName[0].toUpperCase() +
                  session.userData.lastName[0].toUpperCase()
                }}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-[200px] mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="outline"
                class="w-full"
                @click="store.commit('auth/logOut')"
                >Logout</Button
              >
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div v-else>
        <RouterLink to="/auth/login" class="font-semibold text-sm"> Login </RouterLink>
      </div>
    </div>

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
