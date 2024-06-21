<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MEAL_TYPES } from '@/constants/menu.constant';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import UploadImages from '../upload/UploadImages.vue';
import { computed, ref, watch } from 'vue';
import { store } from '@/store';
import { useToast } from '../ui/toast';
import { Loader2 } from 'lucide-vue-next';

interface Props {
  restaurantId: string,
  action: 'edit' | 'add',
  defaultValues: any,
  openModal: boolean
}

const { toast } = useToast();

const emits = defineEmits(['success', 'modalUpdate']);

const props = defineProps<Props>();
const { restaurantId } = props;
const defaultValues = computed(() => props.defaultValues);
const action = computed(() => props.action);

const images = ref<any[]>([]);

const createPending = computed(() => store.state.menu.createPending);
const createError = computed(() => store.state.menu.createError);
const createSuccess = computed(() => store.state.menu.createSuccess);
const updatePending = computed(() => store.state.menu.updatePending);
const updateError = computed(() => store.state.menu.updateError);
const updateSuccess = computed(() => store.state.menu.updateSuccess);

watch(defaultValues, (data) => {
  if(data) {
    form.setValues(data);
    form.setFieldValue('currency', data?.price?.currency);
    form.setFieldValue('price', data?.price?.value);
    images.value = data?.images
  }
});

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  description: z.string(),
  currency: z.string(),
  price: z.number(),
  mealType: z.string(),
  status: z.string()
}));

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((data) => {
  if(action.value === 'add') {
    if(!images) return toast({
      title: 'Error',
      description: 'Images is reqired'
    })
    store.dispatch('menu/create', {
      restaurant: restaurantId, 
      ...data,
      price: {
        currency: data.currency,
        value: data.price
      },
      images: images.value
    });
    return;
  }
  store.dispatch('menu/update', {
    menuId: defaultValues.value._id, 
    ...data,
    price: {
      currency: data.currency,
      value: data.price
    },
    images: images.value
  });
});

watch(createSuccess, (success) => {
  if(!success) return;  
  toast({
    title: 'Create success',
    description: 'Menu created successfully',
    variant: 'default'
  });
  emits('modalUpdate', false);
  emits('success');
  store.commit('menu/createSuccess', false);
});

watch(createError, (error) => {
  if(!error) return;
  toast({
    title: 'Create error',
    description: error,
    variant: 'destructive'
  });
  store.commit('menu/createError', false);
});

watch(updateSuccess, (success) => {
  if(!success) return;  
  toast({
    title: 'Update success',
    description: 'Menu updated successfully',
    variant: 'default'
  });
  emits('modalUpdate', false);
  emits('success');
  store.commit('menu/updateSuccess', false);
});

watch(updateError, (error) => {
  if(!error) return;
  toast({
    title: 'Update error',
    description: error,
    variant: 'destructive'
  });
  store.commit('menu/updateError', false);
});

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
          {{ action === 'edit' ? 'Edit Menu' : 'Add menu' }}
        </DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-2" enctype="multipart/form-data">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="flex gap-2">
          <FormField v-slot="{ componentField }" name="currency">
            <FormItem class="w-[100px]">
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="₱">
                        {{ '₱' }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="price">
            <FormItem class="flex-1">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="mealType">
          <FormItem>
            <FormLabel>Meal Type</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem 
                      v-for="mealType in MEAL_TYPES" 
                      :value="mealType"
                    >
                      {{ mealType }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="status">
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="available">
                      Available
                    </SelectItem>
                    <SelectItem value="unavailable">
                      Unavailable
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
        <UploadImages
          :defaultImages="defaultValues?.images"
          @imagesChange="(value) => images = value"
        />
        <DialogFooter class="w-full flex justify-end">
          <DialogClose>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" class="flex gap-2">
            <Loader2 v-if="createPending || updatePending" :size="18" class="animate-spin"/>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>