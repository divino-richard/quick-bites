<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormField, FormLabel, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ref, computed, watch } from "vue";
import { Credentials } from "../../types/user.types";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast";
import { getSession } from "@/utils/session.utils";

const store = useStore();
const router = useRouter();
const { toast } = useToast();

const showPassword = ref(false);

const loginPending = computed(() => store.state.auth.loginPending);
const loginError = computed(() => store.state.auth.loginError);
const loginSuccess = computed(() => store.state.auth.loginSuccess);

watch(loginSuccess, (success) => {
  if(success) {
    toast({
      title: 'Logged in successfully',
      variant: 'default'
    });
    const session = getSession();
    redirectUser(session?.userData.userType ?? '');
    store.commit('auth/loginSuccess', false);
  }
});

watch(loginError, (error) => {
  if(error) {
    toast({
      title: error,
      variant: 'destructive'
    });
    store.commit('auth/loginError', '');
  }
});

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

const redirectUser = (userType: string) => {
  switch (userType) {
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
</script>

<template>
  <div className="flex h-screen items-center justify-center px-8">
    <form @submit="onSubmit" className="flex flex-col w-full max-w-[400px] gap-y-5">
      <h1 className="text-lg font-bold">Log In</h1>

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

      <Button type="submit" :disabled="loginPending">
        {{ loginPending ? "Loading..." : "Login" }}
      </Button>
    </form>
  </div>
</template>
