import { ActionTree } from "vuex";
import { RestaurantState } from "../states/restaurant.state";
import { RootState } from "@/store";
import { AxiosError } from "axios";
import api from "@/utils/api";

const restaurantActions: ActionTree<RestaurantState, RootState> = {
  async create({state, commit}, payload) {
    try {
      state.createPending = true;
      await api.post('/api/restaurants', payload);
      commit('createSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('createError', message || 'Something went wrong')
    } finally {
      state.createPending = false;
    }
  },
  async getItems({state, commit}) {
    try {
      state.getItemsLoading = true;
      const response = await api.get('/api/restaurants');
      commit('gotItems', response.data);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemsError', message || 'Something went wrong')
    } finally {
      state.getItemsLoading = false;
    }
  },
  async getItem({state, commit}, id: string) {
    try {
      state.getItemLoading = true;
      const response = await api.get(`/api/restaurants/${id}`);
      commit('gotItem', response.data);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemError', message || 'Something went wrong');
    } finally {
      state.getItemLoading = false;
    }
  }
}

export default restaurantActions;
