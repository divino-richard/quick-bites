<script setup lang="ts">
    import { useForm } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'
    import * as z from 'zod'

    import { Button } from '../ui/button'
    import {
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from '../ui/form'
    import { Input } from '../ui/input'

    const formSchema = toTypedSchema(z.object({
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        phoneNumber: z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
        confirmPassword: z.string().min(2).max(50),
    }))

    const form = useForm({
        validationSchema: formSchema,
    })

    const handleSubmit = form.handleSubmit((values) => {
        console.log('Form submitted!', values)
    })
</script>

<template>
    <div className="w-full m-auto mt-5">
        <h1 className="py-5 text-lg font-bold">Owner's Account Information</h1>
        <form @submit="handleSubmit" className="flex flex-col gap-y-5">
            <div className="flex gap-x-5 w-full">
                <FormField v-slot="{ componentField }" name="firstName" className="flex-1">
                    <FormItem class="flex-1">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="firstname" v-bind="componentField" />
                        </FormControl>
                        <FormMessage class="text-[10px]"/>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="lastName" className="flex-1">
                    <FormItem class="flex-1">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Last name" v-bind="componentField" />
                        </FormControl>
                        <FormMessage class="text-[10px]"/>
                    </FormItem>
                </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="phoneNumber">
                <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Phone number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-[10px]"/>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="email" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-[10px]"/>
                </FormItem>
            </FormField>

            <Button type="submit">
                Next
            </Button>
        </form>
    </div>  
</template>
