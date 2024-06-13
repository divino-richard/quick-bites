import { ActionTree } from "vuex";
import { BusinessState } from "./state";
import { RootState } from "@/store";
import api from "@/utils/api";
import { AxiosError } from "axios";

const businessActions: ActionTree<BusinessState, RootState> = {
  async create ({state, commit}, business) {
    try {
      state.createPending = true;
      await api.post("/api/business", business);
      commit('createSuccess', true);
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        message = error.response?.data?.message;
      }
      commit('createError', message || 'Something went wrong');
    } finally {
      state.createPending = false;
    }
  },
  async getItems({state, commit}) {
    try {
      state.loadingItems = true;
      const response = await api.get('/api/business');
      commit('gotItems', response.data);
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        message = error.response?.data?.message;
      }
      commit('getItemsError', message || 'Something went wrong');
    } finally {
      state.loadingItems = false;
    }
  },
  async getItem({state, commit}, businessId) {
    try {
      state.loadingItem = true;
      const response = await api.get(`/api/business/${businessId}`);
      commit('gotItem', response.data);
    } catch (error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemError', message || 'Something went wrong');
    } finally {
      state.loadingItem = false;
    }
  }
}

export default businessActions;
