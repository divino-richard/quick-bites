<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

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
import { ref } from "vue";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const submitLoading = ref(false);
const submitError = ref("");

const formSchema = toTypedSchema(
  z.object({
    businessName: z.string().min(2).max(50),
    businessType: z.string().min(2).max(50),
    businessRegistrationNumber: z.number().min(10),
    businessAddress: z.string().min(2).max(50),
    bankName: z.string().min(2).max(50),
    bankHolderName: z.string().min(2).max(50),
    bankAccountNumber: z.number().min(10),
    taxIdNumber: z.number().min(10),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const handleSubmit = form.handleSubmit((data) => {
  submitLoading.value = true;
  api
    .post("/api/merchant/registration/completion", data)
    .then((response) => {
      console.log(response);
      router.push("/merchant");
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        return (submitError.value = error.response?.data?.message);
      }
      submitError.value = "Something went wrong. Please try again later";
    })
    .finally(() => {
      submitLoading.value = false;
    });
});
</script>

<template #fallback>
  <form @submit="handleSubmit" class="w-full max-w-[800px] m-auto space-y-4 p-7">
    <h1 class="text-lg font-semibold">Complete Registration</h1>

    <p class="text-red-500 text-sm text-center font-bold">{{ submitError }}</p>

    <div class="flex sm:flex-row flex-col gap-x-10">
      <div class="flex-1 space-y-5">
        <FormField v-slot="{ componentField }" name="businessName" class="flex-1">
          <FormItem class="flex-1">
            <FormLabel>Bussiness name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Business name" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="businessType">
          <FormItem>
            <FormLabel>Business type</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="Restaurants and Cafes">
                      Restaurants and Cafes
                    </SelectItem>
                    <SelectItem value="Cloud Kitchens"> Cloud Kitchens </SelectItem>
                    <SelectItem value="Bakeries and Dessert Shops">
                      Bakeries and Dessert Shops
                    </SelectItem>
                    <SelectItem value="Specialty Food Stores">
                      Specialty Food Stores
                    </SelectItem>
                    <SelectItem value="Dietary Specific Businesses">
                      Dietary Specific Businesses
                    </SelectItem>
                    <SelectItem value="Ice Cream and Frozen Treat Shops">
                      Ice Cream and Frozen Treat Shops
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="businessRegistrationNumber">
          <FormItem>
            <FormLabel>Registration number</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Phone number" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="taxIdNumber">
          <FormItem>
            <FormLabel>TIN</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Tax ID Number" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="businessAddress">
          <FormItem>
            <FormLabel>Business address</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Business address" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1 space-y-5">
        <FormField v-slot="{ componentField }" name="bankName">
          <FormItem>
            <FormLabel>Bank name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Bank name" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankHolderName">
          <FormItem>
            <FormLabel>Bank holder name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Holder name" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankAccountNumber">
          <FormItem>
            <FormLabel>Account number</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Account number" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[10px]" />
          </FormItem>
        </FormField>
      </div>
    </div>

    <div class="flex justify-end">
      <Button type="submit" :disabled="submitLoading">
        {{ submitLoading ? "Loading..." : "Submit" }}
      </Button>
    </div>
  </form>
</template>
