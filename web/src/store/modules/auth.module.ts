import { Module } from "vuex";
import authState, { AuthState } from "../states/auth.state";
import { RootState } from "@/store";
import authMutations from "../mutations/auth.mutations";
import authActions from "../actions/auth.actions";
import authGetters from "../getters/auth.getters";

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: authState,
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}

export default authModule;
