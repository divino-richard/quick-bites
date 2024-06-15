<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store';
import { Trash } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { useToast } from '../ui/toast';

const store = useStore();
const { toast } = useToast();

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});
const emits = defineEmits(['deleteSuccess']);

const openPopup = ref(false);

const deletePending = computed(() => store.state.user.deletePending);
const deleteSuccess = computed(() => store.state.user.deleteSuccess);

const handleDeleteUser = () => {
  store.dispatch('user/delete', props.userId)
}

watch(deleteSuccess, (success) => {
  if(!success) return;
  openPopup.value = false;
  toast({
    title:  'User deleted successfully',
    variant: 'default'
  });
  store.commit('user/deleteSuccess', false);
  emits('deleteSuccess');
})
</script>

<template>
  <AlertDialog v-model:open="openPopup">
    <AlertDialogTrigger as-child>
      <Button variant="ghost" class="flex gap-2">
        <Trash :size="16"/>
        <span>Delete</span>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the user from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="handleDeleteUser" class="bg-red-500">
          {{ deletePending ? 'Pending...' : 'Continue'}}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>