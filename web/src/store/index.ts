import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import authModule, { AuthState } from './modules/auth.module';
import merchantBusiness, { BusinessState } from './modules/merchant/business.module';
import foodMenu, { FoodMenuState } from './modules/merchant/foodMenu.module';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import { FoodMenu, FoodMenuResponse } from '@/types/foodMenu.type';

export interface RootState {
    networkError: string,
    foods: Array<FoodMenuResponse> | null,
    getFoodMenuError: string,
    getFoodMenuLoading: boolean,
    auth: AuthState,
    merchantBusiness: BusinessState,
    merchantFoodMenu: FoodMenuState,
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
        merchantBusiness: merchantBusiness,
        merchantFoodMenu: foodMenu,
    },
    state: {
        networkError: '',
        foods: null,
        getFoodMenuError: '',
        getFoodMenuLoading: false,
    } as RootState,
    mutations: {
        setNetworkError (state, errorMessage: string) {
            state.networkError = errorMessage;
        },
        gotFoodMenus (state, foods) {
            state.foods = foods;
        }
    }, 
    actions: {
        async getFoodMenus({state, commit}, pagination) {
            try {
                state.getFoodMenuLoading = true;
                const foods = await api.get(`/public/foodMenu/list/${pagination.skip}/${pagination.limit}`);
                commit('gotFoodMenus', foods.data);
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.getFoodMenuError = error.response?.data.message;
                    return;
                }
                state.getFoodMenuError = 'Something went wrong';
            } finally {
                state.getFoodMenuLoading = false;
            }
        }
    },
    getters: {
        getNetworkError (state) {
            return state.networkError;
        }
    }
});

export function useStore () {
    return baseUseStore(key);
}