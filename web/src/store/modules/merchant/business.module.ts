import { RootState } from "@/store";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { Module } from "vuex";

export interface BusinessState {
    businessInfo: any | null;
    loadingBusiness: boolean;
    businessFetchError: string;
    loadingCreateBusiness: boolean;
    createBusinessError: string;
    businessCreated: boolean;
}

const businessModule: Module<BusinessState, RootState>  = {
    namespaced: true,
    state: {
        businessInfo: null,
        loadingBusiness: false,
        businessFetchError: '',
        loadingCreateBusiness: false,
        createBusinessError: '',
        businessCreated: false,
    } as BusinessState,
    mutations: {
        setBusinessInfo (state, businessInfo) {
            state.businessInfo = businessInfo;
        },
        setBusinessLoading (state, loading: boolean) {
            state.loadingBusiness = loading;
        },
        setFetchBusinessError (state, errorMessage: string) {
            state.businessFetchError = errorMessage;
        },
    },
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
        async createBusiness ({state, commit, dispatch}, business) {
            state.loadingCreateBusiness = true;
            try {
                await api.post(
                    "/api/merchant/registration/completion", 
                    business
                );
                dispatch('fetchBusiness');
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.code === "ERR_NETWORK") {
                        commit(
                            'setNetworkError', 
                            'Network connection error', 
                            { root: true}
                        );
                        return;
                    }
                    state.createBusinessError = error.response?.data?.message;
                    return;
                }
                state.createBusinessError = "Something went wrong. Please try again later.";
            } finally {
                state.loadingCreateBusiness = false
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