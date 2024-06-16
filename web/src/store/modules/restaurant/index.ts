import { RootState } from "@/store";
import { Module } from "vuex";
import restaurantState, { RestaurantState } from "./state";
import restaurantMutations from "./mutations";
import restaurantActions from "./actions";

const restaurantModule: Module<RestaurantState, RootState> = {
  namespaced: true,
  state: restaurantState,
  mutations: restaurantMutations, 
  actions: restaurantActions
}

export default restaurantModule;