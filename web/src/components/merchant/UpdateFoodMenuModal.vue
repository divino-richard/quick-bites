<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { PropType, computed, ref, watch } from "vue";
import { FoodMenu } from "@/types/foodMenu.type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import Spinner from "../ui/Spinner.vue";
import { useToast } from "../ui/toast";

const store = useStore();
const { toast } = useToast();

const formValueChanged = ref(false);
const updateFoodMenuLoading = computed(
  () => store.state.merchantFoodMenu.updateItemLoading
);
const updateFoodMenuError = computed(() => store.state.merchantFoodMenu.updateItemError);
const updateFoodMenuSuccess = computed(
  () => store.state.merchantFoodMenu.updateItemSuccess
);

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
  currentData: {
    type: Object as PropType<FoodMenu | null>,
    required: true,
  },
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50).nullish(),
    description: z.string().min(2).max(50).nullish(),
    price: z.number().min(50).nullish(),
    category: z.string().min(2).max(50).nullish(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((newData) => {
  const data = {
    id: props.currentData?._id,
    newData,
  };
  store.dispatch("merchantFoodMenu/updateItem", data);
});

watch(updateFoodMenuError, (error) => {
  if (error) {
    toast({
      title: error,
      variant: "destructive",
    });
    store.commit("merchantFoodMenu/resetUpdateItemError");
  }
});

watch(updateFoodMenuSuccess, (success) => {
  if (success) {
    toast({
      title: "Food menu updated successfully",
      variant: "default",
      class: "text-[green]",
    });
    store.commit("merchantFoodMenu/toggleUpdateItemSuccess");
    props.onClose();
  }
});
</script>

<template>
  <Dialog :open="props.open">
    <DialogContent :hideCloseButton="true">
      <ContentHeader>
        <DialogTitle>Update Food Menu</DialogTitle>
      </ContentHeader>

      <form
        @submit="onSubmit"
        @change="() => (formValueChanged = true)"
        class="space-y-2"
      >
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                :default-value="props.currentData?.name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                type="text"
                :default-value="props.currentData?.description"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                :default-value="props.currentData?.price"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input
                type="text"
                :default-value="props.currentData?.category"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button variant="ghost" type="button" @click="props.onClose"> Cancel </Button>
          <Button
            type="submit"
            class="w-[100px]"
            :disabled="formValueChanged ? false : true"
          >
            <Spinner v-if="updateFoodMenuLoading" />
            <span v-else>Update</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
