import { RootState } from "@/store";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { Module } from "vuex";

interface BusinessState {
    businessInfo: any | null,
    loadingBusiness: boolean,
    businessFetchError: string,
}

const businessModule: Module<BusinessState, RootState>  = {
    namespaced: true,
    state: {
        businessInfo: null,
        loadingBusiness: false,
        businessFetchError: ''
    },
    mutations: {
        setBusinessInfo (state, businessInfo) {
            state.businessInfo = businessInfo;
        },
        setBusinessLoading (state, loading: boolean) {
            state.loadingBusiness = loading;
        },
        setFetchBusinessError (state, errorMessage: string) {
            state.businessFetchError = errorMessage;
        }
    },
    actions: {
        async fetchBusiness ({commit}) {
            console.log("Dispatched =>>")
            commit('setBusinessLoading', true);
            try {
                const response = await api.get('api/merchant/business');
                console.log(response)
                commit('setBusinessInfo', response.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if(error.code === 'ERR_NETWORK') {
                        commit('setNetworkError', 'Network connection error');
                        return;
                    }
                    commit('setFetchBusinessError', error.response?.data.message);
                    return;
                }
                commit('setFetchBusinessError', 'Failed to fetch business information')
            } finally {
                commit('setBusinessLoading', false);
            }
        }
    },
    getters: {
        getBusinessInfo (state) {
            return state.businessInfo;
        }
    }
}

export default businessModule;