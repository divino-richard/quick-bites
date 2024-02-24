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
import { Slider } from '@/components/ui/slider'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

interface Props {
  onUpdateOpen: (value: boolean) => void;
  show: boolean;
}

defineProps<Props>();

const formSchema = toTypedSchema(z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().min(2).max(50),
    userType: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})

</script>

<template>
    <Dialog :open="show" :onUpdate:open="onUpdateOpen">
        <DialogContent class="max-w-[800px]">
            <DialogHeader>
                <DialogTitle>Merchant</DialogTitle>
            </DialogHeader>

            <div>
                <Slider
                    :max="100" :step="1"
                />
            </div>
            
            <form @submit="onSubmit" className="flex flex-col gap-y-5">
                <div className="flex gap-x-5 w-full">
                    <FormField v-slot="{ componentField }" name="firstName" className="flex-1">
                        <FormItem>
                            <div className="flex items-center gap-x-2">
                                <FormLabel>First name</FormLabel>
                                <FormMessage />
                            </div>
                            <FormControl>
                                <Input type="text" placeholder="firstname" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="lastName" className="flex-1">
                        <FormItem>
                            <div className="flex items-center gap-x-2">
                                <FormLabel>Last name</FormLabel>
                                <FormMessage />
                            </div>
                            <FormControl>
                                <Input type="text" placeholder="Last name" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>
                </div>

                <FormField v-slot="{ componentField }" name="phoneNumber">
                    <FormItem>
                        <div className="flex items-center gap-x-2">
                            <FormLabel>Phone number</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                            <Input type="text" placeholder="Phone number" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <div className="flex items-center gap-x-2">
                            <FormLabel>Email</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                            <Input type="text" placeholder="email" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <div className="flex items-center gap-x-2">
                            <FormLabel>Password</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                            <Input type="password" placeholder="password" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="confirmPassword">
                    <FormItem>
                        <div className="flex items-center gap-x-2">
                            <FormLabel>Confirm password</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                            <Input type="password" placeholder="Confirm password" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <Button type="submit">
                    Register
                </Button>
            </form>
        </DialogContent>
    </Dialog>
</template>