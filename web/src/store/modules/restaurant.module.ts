import { RootState } from "@/store";
import { Module } from "vuex";
import restaurantState, { RestaurantState } from "../states/restaurant.state";
import restaurantMutations from "../mutations/restaurant.mutations";
import restaurantActions from "../actions/restaurant.actions";

const restaurantModule: Module<RestaurantState, RootState> = {
  namespaced: true,
  state: restaurantState,
  mutations: restaurantMutations, 
  actions: restaurantActions
}

export default restaurantModule;