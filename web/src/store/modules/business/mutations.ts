import { MutationTree } from "vuex";
import { BusinessState } from "./state";

const businessMutations: MutationTree<BusinessState> = {
  createSuccess(state, success: boolean) {
    state.createSuccess = success;
  },
  createError(state, error: string) {
    state.createError = error;
  },
  gotItems(state, items) {
    state.items = items;
  },
  getItemsError(state, error) {
    state.getItemsError = error;
  },
  gotItem(state, payload) {
    state.item = payload;
  },
  getItemError(state, error) {
    state.getItemError = error;
  }
}

export default businessMutations;