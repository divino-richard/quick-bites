import { ActionTree } from "vuex";
import { UserState } from "./state";
import { RootState } from "@/store";
import api from "@/utils/api";
import { AxiosError } from "axios";

const userActions: ActionTree<UserState, RootState> = {
  async create({state, commit}, payload) {
    try {
      state.createPending = true;
      await api.post('/api/users', payload);
      commit('createSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('error', message || 'Something went wrong');
    } finally {
      state.createPending = false;
    }
  },
  async update({state, commit}, payload) {
    try {
      state.updatePending = true;
      await api.put('/api/users', payload);
      commit('updateSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('error', message || 'Something went wrong');
    } finally {
      state.updatePending = false;
    }
  },
  async getItems({state, commit}, payload) {
    try {
      state.loading = true;
      const { skip, limit } = payload;
      const response = await api.get(`/api/users?skip=${skip}&limit=${limit}`);
      const { data, totalCount } = response.data;
      commit('gotItems', data);
      state.totalItems = totalCount;
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('error', message || 'Something went wrong');
    } finally {
      state.loading = false;
    }
  },
  async search({state, commit}, keyword) {
    try {
      state.loading = true;
      const response = await api.get(`/api/users/search?keyword=${keyword}`);
      commit('gotItems', response.data);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('error', message || 'Something went wrong')
    } finally {
      state.loading = false;
    }
  },
  async delete({state, commit}, userId: string) {
    try {
      state.deletePending = true;
      await api.delete(`/api/users/${userId}`);
      commit('deleteSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('error', message || 'Something went wrong')
    } finally {
      state.deletePending = false;
    }
  }
}

export default userActions;