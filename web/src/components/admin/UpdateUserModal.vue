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
import { computed, onMounted, ref, watch } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { store } from '@/store';
import { useToast } from '../ui/toast';
import { Edit } from 'lucide-vue-next';

const { toast } = useToast();

interface Props {
  defaultValues?: any;
}
const props = defineProps<Props>()
const emits = defineEmits(['updateSuccess']);

const openModal = ref(false);

const updatePending = computed(() => store.state.user.updatePending);
const updateSuccess = computed(() => store.state.user.updateSuccess);

onMounted(() => {
  if(!props.defaultValues) return;
  const data = props.defaultValues;
  form.setValues({
    firstName: data.firstName,
    lastName: data.lastName,
    userType: data.userType,
    phoneNumber: data.phoneNumber,
    email: data.email
  });
});

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
  store.dispatch("user/update", {
    userId: props.defaultValues._id,
    ...data
  });
});

watch(updateSuccess, (success) => {
  if(!success) return;
  openModal.value = false;
  toast({
    title: 'User updated successfully',
    variant: 'default'
  });
  store.commit('user/updateSuccess', false);
  emits('updateSuccess');
});
</script>

<template>
  <Dialog v-model:open="openModal">
    <DialogTrigger>
      <Button variant="ghost" class="flex gap-2">
        <Edit :size="16"/>
        <span>Edit</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Update User</DialogTitle>
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
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="merchant">Merchant</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
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
            {{ updatePending  ? 'Loading...' : 'Submit' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>