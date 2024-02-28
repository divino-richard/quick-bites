
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { FormField, FormLabel, FormControl, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ref } from 'vue';
import api from '../../utils/api';
import { Credentials, UserSession } from '../../types/user.types';
import router from '@/router';
import { setSession } from '@/utils/session.utils';

let showPassword = ref(false);
let loginLoading = ref(false);
let loginErrorMessage = ref("");

const formSchema = toTypedSchema(z.object({
    email: z.string().min(2),
    password: z.string().min(2)
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (data: Credentials) => {
    loginLoading.value = true;
    await api.post('/auth/login', data)
        .then((response) => {
            const session: UserSession = response.data;
            setSession(session);

            const { userType } = session.userData;
            
            switch(userType) {
                case 'admin':
                    router.replace({path: '/admin'});
                    break;
                case 'merchant':
                    router.replace({path: '/merchant'});
                    break;
                case 'rider': 
                    router.replace({path: '/rider'});
                    break;
                case 'customer':
                    router.replace({path: '/'});
                    break;
            }
        })
        .catch((error) => {
            loginErrorMessage.value = error.response.data.message;
        }).finally(() => {
            loginLoading.value = false;
        })
});

const togglePassword = (checked: boolean) => {
    showPassword.value = checked
}
</script>

<template>
    <div className="flex h-screen items-center justify-center px-8">
        <form @submit="onSubmit" className="flex flex-col w-full max-w-[400px] gap-y-5">
            <h1 className="text-lg font-bold">Log In</h1>
            
            <p v-if="loginErrorMessage" className="text-red-500 font-semibold text-sm text-center">{{loginErrorMessage}}</p> 

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

            <Button type="submit" :disabled="loginLoading">
                {{loginLoading ? 'Loading...' : 'Login'}}
            </Button>
        </form>
    </div>
</template>