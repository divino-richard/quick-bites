<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { ArrowLeftIcon, Briefcase } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import * as z from "zod";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import MapAutocomplete from "@/components/googlemap/MapAutocomplete.vue";
import { useToast } from "@/components/ui/toast";

const router = useRouter();
const store = useStore();
const { toast } = useToast();

const address = ref('');
const location = ref();

const createPending = computed(() => store.state.business.createPending);
const createSuccess = computed(() => store.state.business.createSuccess);
const createError = computed(() => store.state.business.createError);

watch(createSuccess, (success: boolean) => {
  if(!success) return;
  toast({
    title: 'Created successfully',
    variant: 'default',
    class: 'text-[green]',
  });
  router.push("/merchant/business");
  store.commit('business/createSuccess', false)
});

watch(createError, (error: string) => {
  if(!error) return;
  toast({
    title: 'Created error',
    description: error,
    variant: 'destructive',
  });
  store.commit('business/createError', false)
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    type: z.string(),
    registrationNumber: z.number(),
    bankName: z.string(),
    bankHolderName: z.string(),
    bankAccountNumber: z.number(),
    taxIdNumber: z.number(),
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
  const business = {
    ...data, 
    address: { 
      formattedAddress: address.value, 
      location: location.value 
    }
  }
  store.dispatch("business/create", business);
});
</script>

<template>
  <div class="p-5 bg-zinc-100">
    <Button
      variant="ghost"
      class="flex gap-x-2 items-center"
      @click="() => router.back()"
    >
      <ArrowLeftIcon :size="18" />
      <p class="font-semibold text-[16px]">Back</p>
    </Button>
    <div class="w-full p-5 bg-white">
      <div class="flex items-center gap-x-2 mb-5">
        <Briefcase :size="20" />
        <h1 class="font-bold text-[16px]">Create Your Busines</h1>
      </div>

      <form @submit="onSubmit" class="bg-white space-y-5 rounded-lg">
        <div class="flex gap-5 lg:flex-row flex-col ">
          <div class="flex-1 space-y-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem class="flex-1">
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input  class="flex-1" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="type">
              <FormItem class="flex-1">
                <FormLabel>Busines type</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue class="text-zinc-500" placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Business type</SelectLabel>
                        <SelectItem value="Restuarant"> Restuarant </SelectItem>
                        <SelectItem value="Fast Food"> Fast Food </SelectItem>
                        <SelectItem value="Caffes and Coffe Shop">
                          Cafe and Coffee Shop
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div>
              <label>Business address</label>
              <MapAutocomplete 
                @changeAddress="(value) => address = value"
                @changeCenter="(value) => location = value"
              />
            </div>
          </div>
          <div class="flex-1 space-y-5">
            <FormField v-slot="{ componentField }" name="registrationNumber">
              <FormItem  class="flex-1">
                <FormLabel>Registration number</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="taxIdNumber">
              <FormItem class="flex-1">
                <FormLabel>TIN</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="bankName">
              <FormItem class="flex-1">
                <FormLabel>Bank name</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="bankHolderName">
              <FormItem class="flex-1">
                <FormLabel>Holder name</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="bankAccountNumber">
              <FormItem class="flex-1">
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
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
