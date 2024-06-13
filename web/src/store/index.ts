import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import { FoodMenuResponse } from '@/types/foodMenu.type';
import { BusinessState } from './modules/business/state';
import businessModule from './modules/business';
import { MenuState } from './modules/menu/state';
import menuModule from './modules/menu';
import { AuthState } from './modules/auth/state';
import authModule from './modules/auth';
import userModule from './modules/user';
import { UserState } from './modules/user/state';

export interface RootState {
    networkError: string,
    foods: Array<FoodMenuResponse> | null,
    getFoodMenuError: string,
    getFoodMenuLoading: boolean,
    auth: AuthState,
    business: BusinessState,
    menu: MenuState,
    user: UserState
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
        business: businessModule,
        menu: menuModule,
        user: userModule
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