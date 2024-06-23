<script setup lang="ts">
import { ShoppingBag, ShoppingCart } from 'lucide-vue-next';
import Badge from '../ui/badge/Badge.vue';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { formatPrice } from '@/utils/format.utils';

interface Props {
  menu: any,
  openModal: boolean
}

const emits = defineEmits(['success', 'modalUpdate']);

defineProps<Props>();

const handleUpdateModal = (value: boolean) => {
  emits('modalUpdate', value);
}
</script>

<template>
  <Dialog 
    :open="openModal"
    @update:open="handleUpdateModal"
  >
    <DialogContent class="max-w-[700px]">
      <DialogHeader>
        <DialogTitle class="flex gap-x-2">
          Menu Details
        </DialogTitle>
      </DialogHeader>
      <div class="flex gap-5">
        <img 
          :src="menu.images[0].imageUrl" alt=""
          class="h-[200px] w-[300px] object-cover"
        >
        <div>
          <h1 class="text-[18px] font-semibold">{{ menu.name }}</h1>
          <p class="text-[14px]">{{'Good for ' + menu.mealType }}</p>
          <Badge 
            :class="{
              'bg-green-500' : menu.status === 'available',
              'bg-zinc-500' : menu.status === 'unavailable'
            }"
          >
            {{ menu.status }}
          </Badge>
          <p class="text-[#EA580C] font-semibold text-[20px]">
            {{ menu.price.currency + formatPrice(menu.price.value) }}
          </p>
          <p class="text-[14px] line-clamp-5">
            {{ menu.description }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2 ">
        <Button variant="outline" class="flex gap-2">
          <ShoppingCart :size="18" color="#EA580C"/>
          Add Cart
        </Button>
        <Button class="flex gap-2">
          <ShoppingBag :size="18" color="#EA580C"/>
          Order Now
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>