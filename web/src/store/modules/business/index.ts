
import { RootState } from "@/store";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { Module } from "vuex";
import { BusinessState, businessState } from "./state";
import businessMutations from "./mutations";
import businessActions from "./actions";
import businessGetters from "./getters";

const businessModule: Module<BusinessState, RootState>  = {
    namespaced: true,
    state: businessState,
    mutations: businessMutations,
    actions: {
      async fetchBusiness ({commit}) {
          commit('setBusinessLoading', true);
          try {
              const response = await api.get('api/merchant/business');
              commit('setBusinessInfo', response.data);
          } catch (error) {
              if (error instanceof AxiosError) {
                  if(error.code === 'ERR_NETWORK') {
                      commit('setNetworkError', 'Network connection error', { root: true});
                      return;
                  }
                  commit('setFetchBusinessError', error.response?.data.message);
                  return;
              }
              commit('setFetchBusinessError', 'Failed to fetch business information')
          } finally {
              commit('setBusinessLoading', false);
          }
      },
      ...businessActions
    },
    getters: businessGetters
}

export default businessModule;