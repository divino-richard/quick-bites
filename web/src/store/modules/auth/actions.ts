import { RootState } from "@/store";
import { ActionTree } from "vuex";
import { AuthState } from "./state";
import { AxiosError } from "axios";
import api from "@/utils/api";
import { setSession } from "@/utils/session.utils";

const authActions: ActionTree<AuthState, RootState> = {
  async register({state, commit}, payload) {
    try {
      state.registerPending = true;
      await api.post('/auth/register', payload);
      commit('registerSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('registerError', message || 'Something went wrong')
    } finally {
      state.registerPending = false;
    }
  },
  async login({state, commit}, payload) {
    try {
      state.loginPending = false;
      const response = await api.post('/auth/login', payload);
      const session = response.data;
      setSession(session);
      state.session = session;
      commit('loginSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('loginError', message || 'Somethinf went wrong');
    } finally {
      state.loginPending = false;
    }
  }
}

export default authActions;