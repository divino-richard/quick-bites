<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { store } from '@/store';
import { Settings2, Utensils } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const Router =  useRouter();

const restaurants = computed(() => store.state.restaurant.items);

onMounted(() => {
  store.dispatch('restaurant/getItems')
})
</script>

<template>
  <div class="p-5 bg-zinc-100">
    <div class=" bg-white p-5 rounded-lg space-y-5">
      <div class="flex items-center justify-between">
        <div class="w-fit flex items-center gap-2">
          <Utensils :size="18" color="#EA580C"/>
          <h1 class="text-zinc-800 text-[16px] font-semibold">
            My Restaurants
          </h1>
        </div>
       
        <Button 
          @click="() => Router.push('./restaurants/create')"
        >
          New Restaurant
        </Button>
      </div>

      <div 
        v-for="restaurant in restaurants"
        class="flex justify-between border border-zinc-100 p-5 rounded-lg"
      >
        <div class="flex gap-5">
          <Avatar size="base">
            <AvatarFallback>
              {{ restaurant.name[0] }}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 class="text-[16px] text-zinc-800 font-semibold">
              {{ restaurant.name }}
            </h1>
            <div class="flex items-center gap-2 mb-2">
              <Utensils :size="14"/>
              <p class="text-[14px]">{{ restaurant.type }}</p>
            </div>
            <Badge>{{restaurant.specialFeature }}</Badge>
          </div>
        </div>
        <div>
          <RouterLink :to="`./restaurants/${restaurant._id}`">
            <Button variant="outline" class="flex gap-2">
              <Settings2 :size="18" class="text-[#EA580C]"/>
              Manage
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>