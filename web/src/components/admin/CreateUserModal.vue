<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '../ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { computed, ref, watch } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { store } from '@/store';
import { useToast } from '../ui/toast';
import { USER_TYPES } from '@/constants/user.constants';

const { toast } = useToast();

const emits = defineEmits(['createSuccess']);

const openModal = ref(false);

const createPending = computed(() => store.state.user.createPending);
const createSuccess = computed(() => store.state.user.createSuccess);

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: z.string().min(10),
  userType: z.string(),
  email: z.string().email(),
}));

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((data) => {
  store.dispatch("user/create", data);
});

watch(createSuccess, (success) => {
  if(!success) return;
  openModal.value = false;
  toast({
    title:  'User created successfully',
    variant: 'default'
  });
  store.commit('user/createSuccess', false);
  emits('createSuccess');
});
</script>

<template>
  <Dialog v-model:open="openModal">
    <DialogTrigger>
      <Button>
        New User
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Create New User</DialogTitle>
      </DialogHeader>

      <form @submit="onSubmit" class="flex flex-col gap-y-5">
        <div class="flex gap-x-5 w-full">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem class="flex-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="First name" v-bind="componentField"/>
               </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName" >
            <FormItem class="flex-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Last name" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="phoneNumber">
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Phone number" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="userType">
          <FormItem>
            <FormLabel>User type</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem 
                      v-for="userType in USER_TYPES" 
                      :value="userType"
                    >
                      {{ userType }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="flex justify-end gap-2">
          <DialogClose>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" class="w-fit font-semibold text-sm">
            {{ createPending ? 'Loading...' : 'Submit' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>