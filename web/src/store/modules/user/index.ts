import { RootState } from "@/store";
import { Module } from "vuex";
import userState, { UserState } from "./state";
import userMutations from "./mutations";
import userActions from "./actions";

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: userState,
  mutations: userMutations,
  actions: userActions
}

export default userModule;