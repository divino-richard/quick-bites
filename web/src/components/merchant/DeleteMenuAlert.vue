<script setup lang="ts">
import { Loader2, Trash } from 'lucide-vue-next';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { store } from '@/store';
import { computed, ref, watch } from 'vue';
import { useToast } from '../ui/toast';

const { toast } = useToast();

const { menuId } = defineProps({
  menuId: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['deleteSuccess']);

const openAlert = ref(false);

const pending = computed(() => store.state.menu.deletePending);
const error = computed(() => store.state.menu.deleteError);
const success = computed(() => store.state.menu.deleteSuccess);

const handleDeleteMenu = () => {
  store.dispatch('menu/delete', menuId);
}

watch(success, (success) => {
  if(!success) return;
  openAlert.value = false;
  toast({
    title: 'Delete success',
    description: 'Menu deleted successfully',
    variant: 'default'
  });
  emits('deleteSuccess');
  store.commit('menu/deleteSuccess', false);
});

watch(error, (error) => {
  if(!error) return;
  toast({
    title: 'Delete error',
    description: error,
    variant: 'destructive'
  });
  store.commit('menu/deleteError', '');
});
</script>

<template>
  <AlertDialog 
    :open="openAlert" 
    @update:open="(value: boolean) => openAlert = value"
  >
    <AlertDialogTrigger as-child>
      <Button variant="ghost" class="flex gap-1">
        <Trash :size="16"/>
        <span>Delete</span>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the menu from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          @click="handleDeleteMenu" 
          class="flex gap-2 bg-red-500"
        >
          <Loader2 v-if="pending" :size="18" class="animate-spin" />
          {{ pending ? 'Deleting...' : 'Continue' }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>