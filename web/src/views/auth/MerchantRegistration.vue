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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

const ACCEPTED_DOCS_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const ACCEPTED_IMAGES_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg',
];
const formSchema = toTypedSchema(z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
    businessName: z.string().min(2).max(50),
    businessType: z.string().min(2).max(50),
    registrationNumber: z.number().min(10),
    businessAddress: z.string().min(2).max(50),
    bankName: z.string().min(2).max(50),
    bankHolderName: z.string().min(2).max(50),
    bankAccountNumber: z.number().min(10),
    taxIdNumber: z.number().min(10),
    businessLicense: 
        z.custom<File>((file) => {
            if(!file) return false
            else return true
        }, 'Business license is required')
        .transform((file) => file as File)
        .refine(
            (file) => file?.size <= 700000,
            'File size should be less than or equal to 700KB.'
        )
        .refine(
            (file) => ACCEPTED_DOCS_TYPES.includes(file?.type),
            'Only these types are allowed: .pdf, .doc, .docx'
        ),
    taxRegistration:
        z.custom<File>((file) => {
            if(!file) return false
            else return true
        }, 'Business license is required')
        .transform((file) => file as File)
        .refine(
            (file) => file?.size <= 700000,
            'File size should be less than or equal to 700KB.'
        )
        .refine(
            (file) => ACCEPTED_DOCS_TYPES.includes(file?.type),
            'Only these types are allowed: .pdf, .doc, .docx'
        ),
    ownerIdPicture:
        z.custom<File>((file) => {
            if(!file) return false
            else return true
        }, 'Owner Identification is required')
        .transform((file) => file as File)
        .refine(
            (file) => file?.size <= 100000, 
            'File size should be less than or equal to 100KB'
        )
        .refine(
            (file) => ACCEPTED_IMAGES_TYPES.includes(file?.type), 
            'Only these types are allowed: .png, .jpg, .jpeg'
        )
}));

const form = useForm({
    validationSchema: formSchema,
})

const handleSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
});

</script>

<template #fallback>
    <div class="w-full py-10 px-7">
        <form @submit="handleSubmit" class="w-full max-w-[800px] m-auto space-y-4">
            <h1 class="text-lg font-semibold">Merchant's Registration</h1>
            <div class="flex space-x-10">
                <div class="flex-1 space-y-10">
                    <div class="space-y-4 mt-5">
                        <h1 class="text-sm font-bold">Owner's Information</h1>
    
                        <div class="flex gap-x-5 w-full">
                            <FormField v-slot="{ componentField }" name="firstName" class="flex-1">
                                <FormItem class="flex-1">
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="First name" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage class="text-[10px]"/>
                                </FormItem>
                            </FormField>
            
                            <FormField v-slot="{ componentField }" name="lastName" class="flex-1">
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

                        <FormField v-slot="{ componentField }" name="password" class="flex-1">
                            <FormItem class="flex-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="confirmPassword" class="flex-1">
                            <FormItem class="flex-1">
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm password" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
                    </div>
    
                    <div class="space-y-4 mt-5">
                        <h1 class="text-sm font-bold">Business Information</h1>
    
                        <FormField v-slot="{ componentField }" name="businessName" class="flex-1">
                            <FormItem class="flex-1">
                                <FormLabel>Bussiness name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Business name" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
            
                        <FormField v-slot="{ componentField }" name="businessType">
                            <FormItem>
                                <FormLabel>Business type</FormLabel>
                                <FormControl>
                                    <Select v-bind="componentField" >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select business type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="Restaurants and Cafes">
                                                Restaurants and Cafes
                                            </SelectItem>
                                            <SelectItem value="Cloud Kitchens">
                                                Cloud Kitchens
                                            </SelectItem>
                                            <SelectItem value="Bakeries and Dessert Shops">
                                                Bakeries and Dessert Shops
                                            </SelectItem>
                                            <SelectItem value="Specialty Food Stores">
                                                Specialty Food Stores
                                            </SelectItem>
                                            <SelectItem value="Dietary Specific Businesses">
                                                Dietary Specific Businesses
                                            </SelectItem>
                                            <SelectItem value="Ice Cream and Frozen Treat Shops">
                                                Ice Cream and Frozen Treat Shops
                                            </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                        </Select>
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
        
                        <FormField v-slot="{ componentField }" name="registrationNumber">
                            <FormItem>
                                 <FormLabel>Registration number</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Phone number" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
                        
                        <FormField v-slot="{ componentField }" name="taxIdNumber">
                            <FormItem>
                                <FormLabel>TIN</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Tax ID Number" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
        
                        <FormField v-slot="{ componentField }" name="businessAddress">
                            <FormItem>
                                <FormLabel>Business address</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Business address" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
                    </div>
                </div>
    
                <div class="flex-1 space-y-10">
                    <div class="space-y-4 mt-5">
                        <h1 class="text-sm font-bold">Financial Information</h1>
        
                        <FormField v-slot="{ componentField }" name="bankName">
                            <FormItem>
                                <FormLabel>Bank name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Bank name" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="bankHolderName">
                            <FormItem>
                                <FormLabel>Bank holder name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Holder name" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
    
                        <FormField v-slot="{ componentField }" name="bankAccountNumber">
                            <FormItem>
                                <FormLabel>Account number</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Account number" v-bind="componentField" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
                    </div>
    
                    <div class="space-y-4 mt-16 ">
                        <h1 class="text-sm font-bold">Legal and Compliance Documents</h1>

                        <FormField v-slot="{ handleChange }" name="businessLicense">
                            <FormItem>
                                <FormLabel>Business license</FormLabel>
                                <FormControl>
                                    <Input type="file" @change="handleChange"/>
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ handleChange }" name="taxRegistration">
                            <FormItem>
                                <FormLabel>Tax registration</FormLabel>
                                <FormControl>
                                    <Input type="file" placeholder="Tax registration" @change="handleChange" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ handleChange }" name="ownerIdPicture">
                            <FormItem>
                                <FormLabel>Owner ID</FormLabel>
                                <FormControl>
                                    <Input type="file" placeholder="Owner ID" @change="handleChange" />
                                </FormControl>
                                <FormMessage class="text-[10px]"/>
                            </FormItem>
                        </FormField>
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <Button type="submit">
                    Submit
                </Button>
            </div>
        </form>
    </div>  
</template>
