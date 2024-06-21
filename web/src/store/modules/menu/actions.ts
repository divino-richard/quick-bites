import { ActionTree } from "vuex";
import { MenuState } from "./state";
import { RootState } from "@/store";
import { AxiosError } from "axios";
import api from "@/utils/api";

const menuActions: ActionTree<MenuState, RootState> = { 
  async getItems({state, commit}, payload) {
    try {
      state.loadingItems = true;
      const { restaurantId, status, search } = payload;
      const response = await api.get('/api/menus', {
        params: {
          rid: restaurantId,
          ...((status && status !== 'all') && { status }),
          ...(search && { search })
        }
      });
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
  async getPublicItems({state, commit}) {
    try {
      state.loadingItems = true;
      const response = await api.get('/menus', { 
        params: {
          skip: 0,
          limit: 10
        }
      });
      const { data, totalCount } = response.data;
      commit('gotItems', data);
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
  },
  async update({state, commit}, payload) {
    try {
      const { menuId, ...data } = payload;
      state.updatePending = true;
      await api.put(`/api/menus/${menuId}`, data);
      commit('updateSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('updateError', message || 'Something went wrong');
    } finally {
      state.updatePending = false;
    }
  }
}

export default menuActions;