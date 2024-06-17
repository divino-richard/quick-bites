<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
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

const { toast } = useToast();

const emits = defineEmits(['createSuccess']);

const { restaurantId } = defineProps({
  restaurantId: {
    type: String,
    required: true
  }
});

const images = ref<any[]>([]);
const createPending = computed(() => store.state.menu.createPending);
const createError = computed(() => store.state.menu.createError);
const createSuccess = computed(() => store.state.menu.createSuccess);

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  description: z.string(),
  currency: z.string(),
  price: z.number(),
  mealType: z.string(),
  status: z.string()
}));

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((data) => {
  store.dispatch('menu/create', {
    restaurant: restaurantId, 
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
  emits('createSuccess');
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
</script>

<template>
  <Dialog>
    <DialogTrigger :disabled="createPending">
      <Button :disabled="createPending" class="flex gap-1">
        <Loader2 v-if="createPending" :size="20" class="animate-spin"/>
        Add Menu
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[700px]">
      <DialogHeader>
        <DialogTitle class="flex gap-x-2">
          Add Menu
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
          @imagesChange="(value) => images = value"
        />

        <DialogFooter class="w-full flex justify-end">
          <DialogClose>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit" class="flex gap-2">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>