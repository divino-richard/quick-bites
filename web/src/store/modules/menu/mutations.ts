import { MutationTree } from "vuex";
import { MenuState } from "./state";

const menuMutations: MutationTree<MenuState> = {
  gotItems(state, items) {
    state.items = items;
  },
  getItemsError(state, error) {
    state.getItemsError = error;
  }
}

export default menuMutations;