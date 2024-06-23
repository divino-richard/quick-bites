import { MutationTree } from "vuex";
import { UserState } from "../states/user.state";

const userMutations: MutationTree<UserState> = {
  createSuccess(state, success: boolean) {
    state.createSuccess = success;
  },
  updateSuccess(state, success: boolean) {
    state.updateSuccess = success;
  },
  deleteSuccess(state, success: boolean) {
    state.deleteSuccess = success;
  },
  error(state, error: string) {
    state.error = error;
  },
  gotItems(state, items) {
    state.items = items;
  },
}

export default userMutations;