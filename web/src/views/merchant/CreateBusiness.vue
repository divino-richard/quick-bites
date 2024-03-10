<script setup>
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
import api from "@/utils/api";
import { toTypedSchema } from "@vee-validate/zod";
import { AxiosError } from "axios";
import { useForm } from "vee-validate";
import { ref } from "vue";
import * as z from "zod";

const submitLoading = ref(false);
const submitError = ref("");

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
  submitLoading.value = true;
  try {
    const createBusinessResponse = await api.post(
      "/api/merchant/registration/completion",
      data
    );
    router.replace("/merchant");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        submitError.value = "Please check your internet connection";
        return;
      }
      submitError.value = error.response.data.message;
      return;
    }
    submitError.value = "Something went wrong. Please try again later.";
  } finally {
    submitLoading.value = false;
  }
});
</script>

<template>
  <div class="p-5">
    <div class="w-full max-w-[500px] m-auto">
      <h1 class="font-bold text-[16px] mb-2">Create Your Busines</h1>

      <p v-if="submitError" class="text-center text-red-500 text-sm font-semibold">
        {{ submitError }}
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
                    <SelectItem value="restuarant"> Restuarant </SelectItem>
                    <SelectItem value="cafes-coffee-shop">
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

        <Button class="w-full" type="submit" :disabled="submitLoading">
          {{ submitLoading ? "Loading..." : "Submit" }}
        </Button>
      </form>
    </div>
  </div>
</template>
