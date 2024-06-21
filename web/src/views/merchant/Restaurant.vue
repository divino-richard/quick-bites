<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/store";
import { ArrowLeftIcon, Utensils } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import BusinessInfoSkeleton from "@/components/skeletons/BusinessInfoSkeleton.vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import MenuList from "@/components/merchant/MenuList.vue";
import { Badge } from "@/components/ui/badge";
import RestaurantDetails from "@/components/merchant/RestaurantDetails.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const restaurantId = route.params.id;

const activeTab = ref('menus');

onMounted(() => {
  store.dispatch("restaurant/getItem", restaurantId);
});

const restaurant = computed(() => store.state.restaurant.item);
const loadingRestaurnt = computed(() => store.state.restaurant.getItemLoading);

</script>

<template>
  <div class="bg-zinc-100 p-5">
    <Button
      variant="ghost"
      class="flex gap-x-2 items-center mb-2"
      @click="() => router.back()"
    >
      <ArrowLeftIcon :size="18" />
      <p class="font-semibold text-[16px]">Back</p>
    </Button>
    <div class="flex-1 p-5 overflow-x-auto bg-white">
      <BusinessInfoSkeleton v-if="loadingRestaurnt" />
      <div v-else>
        <div class="flex gap-2 py-5">
          <Avatar size="base">
            <AvataFallback class="text-[35px]">
              {{ restaurant?.name[0].toUpperCase() }}
            </AvataFallback>
          </Avatar>
          <div class="p-2">
            <h1 class="font-semibold text-[18px] text-zinc-900">{{ restaurant?.name }}</h1>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <Utensils :size="14"/>
                <p class="text-[14px]">{{ restaurant?.type }}</p>
              </div>
              <Badge>{{restaurant?.specialFeature }}</Badge>
            </div>
          </div>
        </div>
        <Tabs default-value="menus" @update:model-value="(value) => activeTab = String(value)">
          <TabsList class="w-full justify-start bg-white">
            <TabsTrigger 
              value="menus" 
              class="px-5 rounded-none" 
              :class="{'border-b border-zinc-800' : activeTab === 'menus'}"
            >
              Menus
            </TabsTrigger>
            <TabsTrigger 
              value="details" 
              class="px-5 rounded-none"
              :class="{'border-b border-zinc-800' : activeTab === 'details'}"
            >
              Details
            </TabsTrigger>
          </TabsList>
          <Separator class="w-full bg-zinc-100" />
          <TabsContent value="menus">
            <MenuList :restaurantId="String(restaurantId)"/>
          </TabsContent>
          <TabsContent value="details">
            <RestaurantDetails :restaurant="restaurant"/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
