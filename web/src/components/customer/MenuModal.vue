<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

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
      <div>{{ menu }}</div>
    </DialogContent>
  </Dialog>
</template>