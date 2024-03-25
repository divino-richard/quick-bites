<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button/Button.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import { useStore } from "@/store";
import { computed, onMounted, ref } from "vue";

const store = useStore();

const session = computed(() => store.getters["auth/getSession"]);
const foods = computed(() => store.state.foods);

const foodsSkip = ref(0);

const foodsLimit = 10;

onMounted(() => {
  store.dispatch("getFoodMenus", { skip: foodsSkip, limit: foodsLimit });
});
</script>

<template>
  <div>
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

    <div class="grid grid-cols-6 p-5">
      <div
        v-for="(food, index) in foods"
        :key="index"
        class="border border-zinc-100 rounded-md w-fit p-2"
      >
        <img :src="food.image" alt="food" class="w-[150px] h-[100px]" />
        <div class="p-2">
          <h1>{{ food.name }}</h1>
          <h2>₱ {{ food.price }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
