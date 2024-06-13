import { MutationTree } from "vuex";
import { UserState } from "./state";

const userMutations: MutationTree<UserState> = {
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
  }
}

export default userMutations;