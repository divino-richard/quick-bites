<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ArrowLeftIcon, Utensils } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import * as z from "zod";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import MapAutocomplete from "@/components/googlemap/MapAutocomplete.vue";
import { useToast } from "@/components/ui/toast";
import { RESTAURANT_SPECIAL_FEATURES, RESTAURANT_TYPES } from "@/constants/restaurant.constant";
import { extractAddressComponents } from "@/utils/address.utils";

const router = useRouter();
const store = useStore();
const { toast } = useToast();

const address = ref();
const formattedAddress = ref('');
const location = ref();

const createPending = computed(() => store.state.restaurant.createPending);
const createSuccess = computed(() => store.state.restaurant.createSuccess);
const createError = computed(() => store.state.restaurant.createError);

watch(createSuccess, (success: boolean) => {
  if(!success) return;
  toast({
    title: 'Created successfully',
    variant: 'default',
    class: 'text-[green]',
  });
  store.commit('restaurant/createSuccess', false)
  router.push("/merchant/restaurants");
});

watch(createError, (error: string) => {
  if(!error) return;
  toast({
    title: "Failed to create restaurant",
    description: error,
    variant: 'destructive',
  });
  store.commit('restaurant/createError', false)
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    type: z.string(),
    specialFeature: z.string(),
    registrationNumber: z.number(),
    taxIdNumber: z.number(),
    postalCode: z.string()
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (data) => {
  if(!address.value || !location.value) {
    toast({
      title: 'Address is required',
      variant: "destructive",
    });
  }
  const restaurant = {
    ...data, 
    address: {
      ...address.value,
      formatted: formattedAddress.value, 
      location: location.value 
    }
  }
  store.dispatch("restaurant/create", restaurant);
});

const handleChangePlace = (place: any) => {
  const result = extractAddressComponents(place.address_components);
  address.value = result;
  formattedAddress.value = place.formatted_address;
  if(result.postalCode) {
    form.setFieldValue('postalCode', result.postalCode);
  }
}
</script>

<template>
  <div class="p-5 bg-zinc-100">
    <Button
      variant="ghost"
      class="flex gap-x-2 items-center mb-2"
      @click="() => router.back()"
    >
      <ArrowLeftIcon :size="18" />
      <p class="font-semibold text-[16px]">Back</p>
    </Button>
    <div class="w-full p-5 bg-white">
      <div class="flex items-center gap-x-2 mb-5">
        <Utensils :size="20" />
        <h1 class="font-bold text-[16px]">Create New Restaurant</h1>
      </div>

      <form @submit="onSubmit" class="bg-white space-y-5 rounded-lg">
        <div class="flex gap-5 lg:flex-row flex-col">
          <div class="flex-1 space-y-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem class="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input class="flex-1" type="text" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="type">
              <FormItem class="flex-1">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue class="text-zinc-500" placeholder="Select restaurant type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Restaurant types</SelectLabel>
                        <SelectItem 
                          v-for="restaurantType in RESTAURANT_TYPES"
                          :value="restaurantType"
                        >
                          {{ restaurantType }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="specialFeature">
              <FormItem class="flex-1">
                <FormLabel>Special feature</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue class="text-zinc-500" placeholder="Select special feature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Special features</SelectLabel>
                        <SelectItem 
                          v-for="feature in RESTAURANT_SPECIAL_FEATURES"
                          :value="feature"
                        >
                          {{ feature }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="registrationNumber">
              <FormItem  class="flex-1">
                <FormLabel>Registration number</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="taxIdNumber">
              <FormItem class="flex-1">
                <FormLabel>TIN</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
          <div class="flex-1 space-y-5">
            <div class="space-y-2">
              <label>Address</label>
              <MapAutocomplete 
                @changePlace="handleChangePlace"
                @changeCenter="(value) => location = value"
              />
            </div>
            <FormField v-slot="{ componentField }" name="postalCode">
              <FormItem class="flex-1">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            class="w-[200px]"
            type="submit"
            :disabled="createPending ? true : false"
          >
            {{ createPending ? "Loading..." : "Submit" }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
