<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store";
import { Hash, MapPin, List, Utensils } from "lucide-vue-next";
import { computed, onMounted } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const store = useStore();
const business = computed(() => store.getters["merchantBusiness/getBusinessInfo"]);
const loadingBusiness = computed(() => store.state.merchantBusiness.loadingBusiness);
onMounted(() => {
  store.dispatch("merchantBusiness/fetchBusiness");
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    price: z.number(),
    category: z.string().min(2).max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((data) => {
  console.log(data);
});

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
</script>

<template>
  <div>
    <div v-if="loadingBusiness">
      <h1>Loading....</h1>
    </div>

    <div v-else>
      <div v-if="business" class="w-full max-w-[900px] m-auto">
        <div class="flex gap-x-2 py-5">
          <Avatar class="w-[75px] h-[75px]">
            <AvataFallback class="text-[35px]">
              {{ business.name[0].toUpperCase() }}
            </AvataFallback>
          </Avatar>
          <div class="p-2">
            <h1 class="font-semibold text-[18px] text-zinc-900">{{ business.name }}</h1>
            <div class="flex items-center gap-x-2 text-[12px] text-zinc-900 font-normal">
              <MapPin :size="16" />
              <p>{{ business.address }}</p>
            </div>
            <div class="flex items-center gap-x-2 text-[12px] font-normal">
              <Hash :size="16" />
              <p>{{ `Registration number: ${business.registrationNumber}` }}</p>
            </div>
            <div class="flex items-center gap-x-2 text-[12px] font-normal">
              <Hash :size="16" />
              <p>{{ `TIN: ${business.taxIdNumber}` }}</p>
            </div>
          </div>
        </div>
        <Separator class="w-full max-w-[900px] m-auto bg-zinc-100" />
        <div class="py-2">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-x-2">
              <List :size="18" />
              <h1 class="text-[14px] font-medium">Menu List</h1>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button class="text-[12px] h-[35px] py-[2px] bg-zinc-900">
                  Add Menu
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="flex gap-x-2">
                    <Utensils :size="18" class="text-orange-600" />
                    <h1>Add Food Menu</h1>
                  </DialogTitle>
                </DialogHeader>
                <form @submit="onSubmit" class="space-y-2">
                  <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="category">
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="menuImages">
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="images/png, images/jpg, images/jepg"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <DialogFooter class="w-full flex justify-end">
                    <Button type="submit"> Submit </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]"> Invoice </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead class="text-right"> Amount </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                <TableCell class="font-medium">
                  {{ invoice.invoice }}
                </TableCell>
                <TableCell>{{ invoice.paymentStatus }}</TableCell>
                <TableCell>{{ invoice.paymentMethod }}</TableCell>
                <TableCell class="text-right">
                  {{ invoice.totalAmount }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div
        v-else
        class="w-full h-screen flex flex-col items-center justify-center gap-y-5"
      >
        <div
          class="w-[200px] h-[200px] rounded-full bg-orange-100 flex items-center justify-center"
        >
          <img src="../../assets/restaurant.png" class="w-[100px] h-[100px]" />
        </div>
        <RouterLink
          to="/merchant/create-business"
          class="bg-orange-600 text-white py-2 px-5 rounded-md"
        >
          Create a Business
        </RouterLink>
      </div>
    </div>
  </div>
</template>