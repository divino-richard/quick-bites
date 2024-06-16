import { RootState } from "@/store";
import { Module } from "vuex";
import { MenuState, menuState } from "./state";
import menuMutations from "./mutations";
import menuActions from "./actions";

const menuModule: Module<MenuState, RootState> = {
  namespaced: true,
  state: menuState,
  mutations: menuMutations, 
  actions: menuActions
}

export default menuModule;