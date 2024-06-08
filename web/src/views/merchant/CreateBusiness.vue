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
import { computed, onMounted, watch } from "vue";
import * as z from "zod";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const router = useRouter();
const store = useStore();

const createBuinessLoading = computed(
  () => store.state.merchantBusiness.loadingCreateBusiness
);
const createBusinessError = computed(
  () => store.state.merchantBusiness.createBusinessError
);

const business = computed(() => store.state.merchantBusiness.businessInfo);
watch(business, () => {
  router.push("/merchant/business");
});

onMounted(() => {
  store.dispatch("merchantBusiness/fetchBusiness");
});

const formSchema = toTypedSchema(
  z.object({
    businessName: z.string(),
    businessType: z.string(),
    businessRegistrationNumber: z.number(),
    businessAddress: z.string(),
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
  store.dispatch("merchantBusiness/createBusiness", data);
});
</script>

<template>
  <div class="p-5">
    <Button
      variant="ghost"
      class="flex gap-x-2 items-center"
      @click="() => router.back()"
    >
      <ArrowLeftIcon :size="18" />
      <p class="font-semibold text-[16px]">Back</p>
    </Button>
    <div class="w-full max-w-[500px] m-auto">
      <div class="flex items-center gap-x-2 mb-5">
        <Briefcase :size="20" />
        <h1 class="font-bold text-[16px]">Create Your Busines</h1>
      </div>

      <p
        v-if="createBusinessError"
        class="text-center text-red-500 text-sm font-semibold"
      >
        {{ createBusinessError }}
      </p>

      <form @submit="onSubmit" class="flex flex-col gap-y-[15px]">
        <FormField v-slot="{ componentField }" name="businessName">
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="businessType">
          <FormItem>
            <FormLabel>Busines type</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
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

        <FormField v-slot="{ componentField }" name="businessRegistrationNumber">
          <FormItem>
            <FormLabel>Registration number</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="businessAddress">
          <FormItem>
            <FormLabel>Business address</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="taxIdNumber">
          <FormItem>
            <FormLabel>TIN</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankName">
          <FormItem>
            <FormLabel>Bank name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankHolderName">
          <FormItem>
            <FormLabel>Holder name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankAccountNumber">
          <FormItem>
            <FormLabel>Account number</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button
          class="w-full"
          type="submit"
          :disabled="createBuinessLoading ? true : false"
        >
          {{ createBuinessLoading ? "Loading..." : "Submit" }}
        </Button>
      </form>
    </div>
  </div>
</template>
