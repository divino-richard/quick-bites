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
    updateItemLoading: boolean;
    updateItemError: string;
    imageUpdated: boolean;
    updateImageLoading: boolean;
    updateImageError: string;
    updateItemSuccess: boolean;
    updateStatusLoading: boolean;
    updateStatusError: string;
    updateStatusSuccess: boolean;
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
        updateItemLoading: false,
        updateItemError: "",
        imageUpdated: false,
        updateImageLoading: false,
        updateImageError: "",
        updateItemSuccess: false,
        updateStatusLoading: false,
        updateStatusError: "",
        updateStatusSuccess: false,
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
        toggleImageUpdated(state) {
            state.imageUpdated = !state.imageUpdated;
        },
        resetImageUpdated(state) {
            state.updateImageError = "";
        },
        toggleUpdateItemSuccess(state) {
            state.updateItemSuccess = !state.updateItemSuccess;
        },
        resetUpdateItemError(state) {
            state.updateItemError = "";
        },
        toggleUpdateStatusSuccess(state) {
            state.updateStatusSuccess = !state.updateStatusSuccess;
        },
        resetUpdateStatusError(state) {
            state.updateStatusError = "";
        }
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
        },
        async updateItem({state, commit, dispatch}, foodMenu) {
            try {
                state.updateItemLoading = true;
                await api.put(`/api/foodMenu/${foodMenu.id}`, foodMenu.newData);
                commit('toggleUpdateItemSuccess');
                dispatch('getFoodMenus');
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.updateItemError = error.response?.data.message;
                    return;
                }
                state.updateItemError = "Something went wrong";
            } finally {
                state.updateItemLoading = false;
            }
        },
        async updateImage({state, commit, dispatch}, foodMenu) {
            try {
                state.updateImageLoading = true;
                await api.put(`/api/foodMenu/image/${foodMenu.id}`, foodMenu.formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                commit('toggleImageUpdated');
                dispatch('getFoodMenus');
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.updateImageError = error.response?.data.message;
                    return;
                }
                state.updateImageError = "Something went wrong";
            } finally {
                state.updateImageLoading = false;
            }
        },
        async updateStatus ({state, commit, dispatch}, foodMenu) {
            try {
                state.updateStatusLoading = true;
                await api.put(`/api/foodMenu/status/${foodMenu.id}`, { status: foodMenu.status});
                commit('toggleUpdateStatusSuccess');
                dispatch('getFoodMenus');
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.updateStatusError = error.response?.data.message;
                    return;
                }
                state.updateStatusError = "Semthing went wrong";
            } finally {
                state.updateStatusLoading = false;
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
