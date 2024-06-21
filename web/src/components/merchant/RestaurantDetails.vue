<script setup lang="ts">
import { Hash, Map, Utensils } from 'lucide-vue-next';

interface Props {
  restaurant: any
}
const {restaurant} = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-2 mt-5">
    <div class="space-y-2">
      <h1 class="text-[14px] font-semibold mb-5">
        Restaurant Information
      </h1>
      <div class="flex items-center gap-2">
        <Utensils :size="18" />
        <p class="text-[14px]">{{ restaurant.name + ` (${restaurant.type}, ${restaurant.specialFeature})`}}</p>
      </div>
      <div class="flex items-center gap-2">
        <Map :size="18" />
        <p class="text-[14px]">{{ restaurant.address.formatted }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Hash :size="18" />
        <p class="text-[14px]">{{ 'RN: ' + restaurant.registrationNumber }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Hash :size="18" />
        <p class="text-[14px]">{{ 'TIN: ' + restaurant.taxIdNumber }}</p>
      </div>
    </div>
    <div>
      <h1 class="text-[14px] font-semibold">
        Documents
      </h1>
    </div>
  </div>
</template>