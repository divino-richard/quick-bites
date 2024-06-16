import { MutationTree } from "vuex";
import { RestaurantState } from "./state";

const restaurantMutations: MutationTree<RestaurantState> = {
  createSuccess(state, success: boolean) {
    state.createSuccess = success;
  },
  createError(state, error: string) {
    state.createError = error;
  },
  gotItems(state, items) {
    state.items = items;
  },
  getItemsError(state, error: string) {
    state.getItemsError = error;
  },
  gotItem(state, item) {
    state.item = item
  },
  getItemError(state, error: string) {
    state.getItemError = error;
  }
}

export default restaurantMutations;