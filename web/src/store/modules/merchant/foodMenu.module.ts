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
    foodMenus: any;
    getFoodMenusLoading: boolean;
    getFoodMenusError: string;
    deleteItemLoading: boolean;
    deleteItemError: string;
    deleteItemSuccess: boolean;
}

const foodMenuModule: Module<FoodMenuState, RootState> = {
    namespaced: true,
    state: {
        addLoading: false,
        addError: '',
        addedItem: null,
        addItemSuccess: false,
        foodMenus: null,
        getFoodMenusLoading: false,
        getFoodMenusError: "",
        deleteItemLoading: false,
        deleteItemError: "",
        deleteItemSuccess: false,
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
        resetAddSuccess (state) {
            state.addItemSuccess = false;
        },
        gotFoodMenus(state, foodMenus) {
            state.foodMenus = foodMenus;
        },
        resetDeleteItemSuccess(state) {
            state.deleteItemSuccess = false;
        },
        resetDeleteItemError(state) {
            state.deleteItemError = "";
        },
    },
    actions: {
        async addFoodMenu({state, commit, dispatch}, data: FoodMenu) {
            state.addLoading = true;
            try {
                const foodMenu = await api.post('/api/foodMenu', data, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                commit('foodMenuAdded', foodMenu);
                dispatch('getFoodMenus');
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
        async getFoodMenus ({state, commit}) {
            state.getFoodMenusLoading = true;
            try {
                const foodMenus = await api.get('/api/foodMenu/list');
                commit('gotFoodMenus', foodMenus.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    state.getFoodMenusError = error.response?.data.message;
                    return;
                }
                state.getFoodMenusError = 'Something went wrong!';
            } finally {
                state.getFoodMenusLoading = false;
            }
        },
        async deleteItem({state, dispatch}, foodMenuId) {
            try {
                state.deleteItemLoading = true;
                await api.delete(`/api/foodMenu/${foodMenuId}`);
                state.deleteItemSuccess = true;
                dispatch('getFoodMenus');
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.deleteItemError = error.response?.data.message;
                    return;
                }
                state.deleteItemError = "Something went wrong.";
            } finally {
                state.deleteItemLoading = false;
            }
        }
    },
    getters: {
        getFoodMenus(state) {
            return state.foodMenus;
        }
    }
}

export default foodMenuModule;
