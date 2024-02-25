<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import api from '@/utils/api';
import { ref } from 'vue';

const registerError = ref('');
const registerLoading = ref(false);

interface Props {
  onUpdateOpen: (value: boolean) => void;
  show: boolean;
}

defineProps<Props>();

const formSchema = toTypedSchema(z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().min(10),
    email: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async(values) => {
    const data = {
        ...values,
        userType: 'merchant',
        password: values.firstName + '@123',
    };

    registerLoading.value = true;

    api.post('/auth/register', data)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            registerError.value = error.response.data.message;
        })
        .finally(() => {
            registerLoading.value = false;
        })
})

</script>

<template>
    <Dialog :open="show" :onUpdate:open="onUpdateOpen" :modal="true">
        <DialogContent class="max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Merchant's Account Information</DialogTitle>
            </DialogHeader>

            <div v-if="registerError">
                <p class="text-red-600 text-sm font-semibold text-center">{{ registerError }}</p>
            </div>

            <form @submit="onSubmit" class="flex flex-col gap-y-5">
                <div class="flex gap-x-5 w-full">
                    <FormField v-slot="{ componentField }" name="firstName">
                        <FormItem class="flex-1">
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="First name" v-bind="componentField"/>
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="lastName" >
                        <FormItem class="flex-1">
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Last name" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>
                </div>

                <FormField v-slot="{ componentField }" name="phoneNumber">
                    <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Phone number" v-bind="componentField" />
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
                    </FormItem>
                </FormField>

                <div class="flex justify-end">
                    <Button type="submit" class="w-fit font-semibold text-sm">
                        {{ registerLoading ? 'Loading...' : 'Submit' }}
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>