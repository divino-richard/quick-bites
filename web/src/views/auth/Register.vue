<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'

const store = useStore();
const { toast } = useToast();
const router = useRouter();

const countryCodes = ['+63'];

const showPasswords = ref(false);
const registrationError = ref('');

const registerPending = computed(() => store.state.auth.registerPending);
const registerSuccess = computed(() => store.state.auth.registerSuccess);
const registerError = computed(() => store.state.auth.registerError);

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: z.number(),
  email: z.string().email(),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((data) => {
  if(data.password !== data.confirmPassword) {
    return registrationError.value = 'Passwords are not the same!';
  }

  store.dispatch('auth/register', { 
    ...data, 
    phoneNumber: countryCodes[0] + data.phoneNumber
  });
});

watch(registerError, (error: string) => {
  if(error) {
    toast({
      title: error,
      variant: "destructive",
    });
    store.commit('auth/registerError', '');
  }
});

watch(registerSuccess, (success: boolean) => {
  if(success) {
    toast({
      title: "Registered successfully",
      variant: "default",
    });
    store.commit('auth/registerSuccess', false);
    router.replace('./login');
  }
});
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <form @submit="onSubmit" className="flex w-full max-w-[500px] mx-5 flex-col gap-y-5">
        <h1 className="text-lg font-bold">Register Account</h1>

        <p v-if="registrationError" 
          class="text-red-500 font-semibold text-sm text-center py-5"
        >
          {{ registrationError }}
        </p>

        <div className="flex gap-x-5 w-full">
            <FormField v-slot="{ componentField }" name="firstName">
                <FormItem  className="flex-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastName">
                <FormItem  className="flex-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input :type="showPasswords ? 'text' : 'password'" placeholder="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input :type="showPasswords ? 'text' : 'password'" placeholder="Confirm password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <div class="flex items-center space-x-2">
            <Checkbox 
              id="showPassword" 
              @update:checked="(value) => showPasswords = value"
            />
            <label
              for="showPassword"
              class="text-sm font-medium"
            >
              Show passwords
            </label>
        </div>

        <Button type="submit" :disabled="registerPending">
          {{ registerPending ? 'Loading...' : 'Register' }}
        </Button>
    </form>
  </div>
</template>
