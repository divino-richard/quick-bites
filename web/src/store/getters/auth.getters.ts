import { GetterTree } from "vuex";
import { AuthState } from "../states/auth.state";
import { RootState } from "@/store";

const authGetters: GetterTree<AuthState, RootState>  = {
  getSession(state) {
    return state.session;
  }
}

export default authGetters;