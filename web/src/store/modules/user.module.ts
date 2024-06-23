import { RootState } from "@/store";
import { Module } from "vuex";
import userState, { UserState } from "../states/user.state";
import userMutations from "../mutations/user.mutations";
import userActions from "../actions/user.actions";

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: userState,
  mutations: userMutations,
  actions: userActions
}

export default userModule;