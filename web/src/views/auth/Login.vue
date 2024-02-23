
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { FormField, FormLabel, FormControl, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ref } from 'vue';

let showPassword = ref(false);

const formSchema = toTypedSchema(z.object({
    email: z.string().min(2),
    password: z.string().min(2)
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log("Values", values);
})

const togglePassword = (checked: boolean) => {
    showPassword.value = checked
}

</script>

<template>
    <div className="flex h-screen items-center justify-center px-8">
        <form @submit="onSubmit" className="flex flex-col w-full max-w-[400px] gap-y-5">
            <h1 className="text-lg font-bold">Log In</h1>
            
            <FormField v-slot="{componentField}" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="email" v-bind="componentField"/>
                    </FormControl>
                </FormItem>
            </FormField>

            <FormField v-slot="{componentField}" name="password" >
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input :type="showPassword ? 'text' : 'password'" placeholder="password" v-bind="componentField"/>
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

            <Button type="submit">
                Login
            </Button>
        </form>
    </div>
</template>