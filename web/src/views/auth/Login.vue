<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormField, FormLabel, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ref, computed } from "vue";
import { Credentials, UserSession } from "../../types/user.types";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const loginLoading = computed(() => store.state.auth.loginLoading);
const loginError = computed(() => store.state.auth.loginError);
const session = computed(() => store.state.auth.session);

if (session.value) {
  const userSession: UserSession = session.value;
  switch (userSession.userData.userType) {
    case "admin":
      router.push("/admin");
      break;
    case "merchant":
      router.push("/merchant");
      break;
    case "rider":
      router.push("/rider");
      break;
    case "customer":
      router.push("/");
      break;
  }
}

let showPassword = ref(false);
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2),
    password: z.string().min(2),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (data: Credentials) => {
  store.dispatch("auth/login", data);
});

const togglePassword = (checked: boolean) => {
  showPassword.value = checked;
};
</script>

<template>
  <div className="flex h-screen items-center justify-center px-8">
    <form @submit="onSubmit" className="flex flex-col w-full max-w-[400px] gap-y-5">
      <h1 className="text-lg font-bold">Log In</h1>

      <p v-if="loginError" className="text-red-500 font-semibold text-sm text-center">
        {{ loginError }}
      </p>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="email" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              :type="showPassword ? 'text' : 'password'"
              placeholder="password"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex items-center space-x-2">
        <Checkbox id="terms" @update:checked="togglePassword" />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show password
        </label>
      </div>

      <Button type="submit" :disabled="loginLoading">
        {{ loginLoading ? "Loading..." : "Login" }}
      </Button>
    </form>
  </div>
</template>
