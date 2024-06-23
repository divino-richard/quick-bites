import { MutationTree } from "vuex";
import { AuthState } from "../states/auth.state";
import { logout } from "@/utils/session.utils";

const authMutations: MutationTree<AuthState> = {
  registerSuccess(state, success: boolean) {
    state.registerSuccess = success;
  },
  registerError(state, error: string) {
    state.registerError = error;
  },
  loginSuccess(state, success: boolean) {
    state.loginSuccess = success;
  },
  loginError(state, error: string) {
    state.loginError = error;
  },
  logOut(state) {
    logout();
    state.session = null;
  }
}

export default authMutations;