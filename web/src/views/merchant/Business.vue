<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/store";
import { ArrowLeftIcon, MapPin } from "lucide-vue-next";
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

const store = useStore();
const route = useRoute();
const router = useRouter();
const businessId = route.params.id;

const activeTab = ref('menus');

onMounted(() => {
  store.dispatch("business/getItem", businessId);
  // store.dispatch("merchantFoodMenu/getFoodMenus");
});

const business = computed(() => store.state.business.item);
const loadingBusiness = computed(() => store.state.business.loadingItem);

</script>

<template>
  <div class="bg-zinc-100 p-5">
    <div class="flex-1 p-5 overflow-x-auto bg-white">
      <BusinessInfoSkeleton v-if="loadingBusiness" />
      <div v-else>
        <Button 
          variant="link" 
          class="flex gap-2"
          :onclick="() => router.back()"
        >
          <ArrowLeftIcon :size="18" />
          <span>Back</span>
        </Button>
        <div class="flex gap-2 py-5">
          <Avatar size="base">
            <AvataFallback class="text-[35px]">
              {{ business?.name[0].toUpperCase() }}
            </AvataFallback>
          </Avatar>
          <div class="p-2">
            <h1 class="font-semibold text-[18px] text-zinc-900">{{ business?.name }}</h1>
            <div class="flex items-center gap-x-2 text-[12px] text-zinc-900 font-normal">
              <MapPin :size="16" />
              <p>{{ business?.businessAddress?.address }}</p>
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
            <MenuList />
          </TabsContent>
          <TabsContent value="details">
            <h1>Details</h1>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
