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
    <div className="w-full max-w-[500px] m-auto mt-5">
        <h1 className="py-5 text-lg font-bold">Register</h1>
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

            <FormField v-slot="{ componentField }" name="userType">
                <FormItem>
                    <div className="flex items-center gap-x-2">
                        <FormLabel>Register as</FormLabel>
                        <FormMessage />
                    </div>
                    <Select v-bind="componentField">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Register as</SelectLabel>
                                <SelectItem value="apple">
                                    Apple
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
    </div>  
</template>
