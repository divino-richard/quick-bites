import { Module } from "vuex";
import authState, { AuthState } from "./state";
import { RootState } from "@/store";
import authMutations from "./mutations";
import authActions from "./actions";
import authGetters from "./getters";

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: authState,
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}

export default authModule;
