import { ActionTree } from "vuex";
import { MenuState } from "./state";
import { RootState } from "@/store";
import { AxiosError } from "axios";
import api from "@/utils/api";

const menuActions: ActionTree<MenuState, RootState> = { 
  async getItems({state, commit}, restaurantId) {
    try {
      state.loadingItems = true;
      const response = await api.get(`/api/menus?rid=${restaurantId}`);
      commit('gotItems', response.data);
    } catch (error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemsError', message || 'Something went wrong');
    } finally {
      state.loadingItems = false;
    }
  },
  async getPublicItems({state, commit}, pagination) {
    try {
      state.loadingItems = true;
      const response = await api.get('/menus', { 
        params: pagination
      });
      commit('gotItems', response.data);
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemsError', message || 'Something went wrong')
    } finally {
      state.loadingItems = false;
    }
  }
}

export default menuActions;