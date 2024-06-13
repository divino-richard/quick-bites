<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { store } from '@/store';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const Router =  useRouter();

const businesses = computed(() => store.state.business.items);

onMounted(() => {
  store.dispatch('business/getItems')
})
</script>

<template>
  <div class="p-5 bg-zinc-100">
    <div class=" bg-white p-5 rounded-lg space-y-5">
      <div class="flex items-center justify-between">
        <h1 class="text-zinc-800 text-[16px] font-semibold">
          List of Businesses
        </h1>
        <Button 
          class="bg-[#EA580C]" 
          @click="() => Router.push('./create-business')"
        >
          Add Business
        </Button>
      </div>

      <div 
        v-for="business in businesses"
        class="flex justify-between border border-zinc-100 p-5 rounded-lg"
      >
        <div class="flex gap-5">
          <Avatar size="base">
            <AvatarFallback>
              {{ business.name[0] }}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 class="text-[16px] text-zinc-800 font-semibold">
              {{ business.name }}
            </h1>
            <p class="text-[12px] text-zinc-500">
              {{'Reg. # ' + business.registrationNumber }}
            </p>
            <p class="text-[12px] text-zinc-500">
              {{ 'TIN # ' + business.taxIdNumber }}
            </p>
          </div>
        </div>
        <div>
          <RouterLink :to="`./business/${business._id}`">
            <Button variant="link">
              Manage
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>