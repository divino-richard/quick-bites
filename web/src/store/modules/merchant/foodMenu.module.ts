import { RootState } from '@/store';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import { Module } from 'vuex';
import { FoodMenu } from '@/types/foodMenu.type';

export interface FoodMenuState {
    addLoading: boolean;
    addError: string;
    addedItem: any;
    addItemSuccess: boolean;
}

const foodMenuModule: Module<FoodMenuState, RootState> = {
    namespaced: true,
    state: {
        addLoading: false,
        addError: '',
        addedItem: null,
        addItemSuccess: false,
    } as FoodMenuState,
    mutations: {
        foodMenuAdded(state, foodMenu) {
            state.addLoading = false;
            state.addedItem = foodMenu;
            state.addItemSuccess = true;
        },
        addError(state, errorMessage: string) {
            state.addError = errorMessage;
        },
        gotFoodMenus(state, foodMenu) {

        }
    },
    actions: {
        async addFoodMenu({state, commit}, data: FoodMenu) {
            state.addLoading = true;
            try {
                const foodMenu = await api.post('/api/foodMenu', data, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
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
        },
        async getFoodMenus (state) {
            state
        }
    },
    getters: {

    }
}

export default foodMenuModule;
