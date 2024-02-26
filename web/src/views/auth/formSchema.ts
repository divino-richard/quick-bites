import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { maxFileSize, ACCEPTED_IMAGE_TYPES } from './MerchantRegistration.vue';

export const formSchema = toTypedSchema(z.object({
firstName: z.string().min(2).max(50),
lastName: z.string().min(2).max(50),
phoneNumber: z.string().min(2).max(50),
email: z.string().min(2).max(50),
businessName: z.string().min(2).max(50),
businessType: z.string().min(2).max(50),
registrationNumber: z.number().min(10),
businessAddress: z.string().min(2).max(50),
bankName: z.string().min(2).max(50),
accountNumber: z.number().min(10),
taxIdNumber: z.number().min(10),
businessLicense: z.custom<FileList>().refine((fileList) => fileList.length === 1, 'Expected file')
.transform((file) => file[0] as File)
.refine((file) => {
return file.size <= maxFileSize;
}, `File size should be less than 1gb.`)
.refine(
(file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
'Only these types are allowed .jpg, .jpeg, .png, .webp and mp4'
),
}));
