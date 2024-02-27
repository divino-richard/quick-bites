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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'
import api from '@/utils/api'
import { useRouter } from 'vue-router'

const showPasswords = ref(false);
const registrationError = ref('');
const registerLoading = ref(false);

const router = useRouter();

const formSchema = toTypedSchema(z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.number().min(2),
    userType: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((user) => {
    if(user.password !== user.confirmPassword) {
        return registrationError.value = 'Passwords are not the same!';
    }

    registerLoading.value = true;

    api.post('/auth/register', {...user, phoneNumber: user.phoneNumber.toString()})
        .then(() => {
            router.push('/auth/login')
        })
        .catch((error) => {
            registrationError.value = error.response?.data?.message
        })
        .finally(() => {
            registerLoading.value = false;
        });
})

</script>

<template>
    <div className="w-full max-w-[500px] m-auto my-10">
        <h1 className="text-lg font-bold mb-5">Register Account</h1>

        <p v-if="registrationError" 
            class="text-red-500 font-semibold text-sm text-center py-5"
        >
            {{ registrationError }}
        </p>

        <form @submit="onSubmit" className="flex flex-col gap-y-5">
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

            <FormField v-slot="{ componentField }" name="userType">
                <FormItem>
                    <FormLabel>Register type</FormLabel>
                    <Select v-bind="componentField">
                        <SelectTrigger>
                            <SelectValue placeholder="Select registration type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Register types</SelectLabel>
                                <SelectItem value="customer">
                                    Customer
                                </SelectItem>
                                <SelectItem value="rider">
                                    Rider
                                </SelectItem>
                                <SelectItem value="merchant">
                                    Merchant
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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

            <Button type="submit" :disabled="registerLoading">
                {{ registerLoading ? 'Loading...' : 'Register' }}
            </Button>
        </form>
    </div>  
</template>
