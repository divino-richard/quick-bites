import { RootState } from "@/store";
import { Module } from "vuex";
import { MenuState, menuState } from "../states/menu.state";
import menuMutations from "../mutations/menu.mutations";
import menuActions from "../actions/menu.actions";

const menuModule: Module<MenuState, RootState> = {
  namespaced: true,
  state: menuState,
  mutations: menuMutations, 
  actions: menuActions
}

export default menuModule;