import { MutationTree } from "vuex";
import { MenuState } from "./state";

const menuMutations: MutationTree<MenuState> = {
  gotItems(state, items) {
    state.items = items;
  },
  getItemsError(state, error: string) {
    state.getItemsError = error;
  },
  createError(state, error: string) {
    state.createError = error;
  },
  createSuccess(state, success: boolean) {
    state.createSuccess = success;
  },
  deleteSuccess(state, success: boolean) {
    state.deleteSuccess = success;
  },
  deleteError(state, error: string) {
    state.deleteError = error;
  },
  updateError(state, error: string) {
    state.updateError = error;
  },
  updateSuccess(state, success: boolean) {
    state.updateSuccess = success;
  },
}

export default menuMutations;