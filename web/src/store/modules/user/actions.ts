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
      commit('createError', message || 'Something went wrong');
    } finally {
      state.createPending = false;
    }
  },
  async getItems({state, commit}, payload) {
    try {
      state.getItemsLoading = true;
      const { skip, limit } = payload;
      const response = await api.get(`/api/users?skip=${skip}&limit=${limit}`);
      commit('gotItems', response.data);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('getItemsError', message || 'Something went wrong');
    } finally {
      state.getItemsLoading = false;
    }
  }
}

export default userActions;