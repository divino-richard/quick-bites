<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/utils/session.utils';

const session = getSession();
const userData = session?.userData;
</script>

<template>
    <div className="flex justify-between items-center p-5">
        <h1 className="font-semibold text-sm">Quick Bites</h1>

        <div v-if="userData">
            <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>

        <div v-else>
            <RouterLink to="/auth/login" class="font-semibold text-sm">
                Login
            </RouterLink> 
        </div>

    </div>
</template>