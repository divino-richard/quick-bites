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
  },
  async create({state, commit}, payload) {
    try {
      state.createPending = true;
      await api.post('/api/menus', payload);
      commit('createSuccess', true);
    } catch(error) {
      console.log('Error', error)
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('createError', message || 'Something went wrong')
    } finally {
      state.createPending = false;
    }
  },
  async delete({state, commit}, menuId) {
    try {
      state.deletePending = true;
      await api.delete(`/api/menus/${menuId}`);
      commit('deleteSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('deleteError', message || "Something went wrong");
    } finally {
      state.deletePending = false;
    }
  }
}

export default menuActions;