import { RootState } from '@/store';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import { Module } from 'vuex';

export interface FoodMenuState {
    addLoading: boolean;
    addError: string;
    addedItem: any;
}

const foodMenuModule: Module<FoodMenuState, RootState> = {
    namespaced: true,
    state: {
        addLoading: false,
        addError: '',
        addedItem: null,
    } as FoodMenuState,
    mutations: {
        foodMenuAdded(state, foodMenu) {
            state.addLoading = false;
            state.addedItem = foodMenu;
        },
        addError(state, errorMessage: string) {
            state.addError = errorMessage;
        }
    },
    actions: {
        async addFoodMenu({state, commit}, data) {
            state.addLoading = true;
            try {
                const foodMenu = await api.post('/api/foodMenu', {data});
                commit('foodMenuAdded', foodMenu);
            } catch (error) {
                if (error instanceof AxiosError) {
                    state.addError = error.response?.data.message;
                    return;
                }
                state.addError = 'Something went wrong!';
            } finally {
                state.addLoading = false;
            }
        }
    },
    getters: {

    }
}

export default foodMenuModule;
