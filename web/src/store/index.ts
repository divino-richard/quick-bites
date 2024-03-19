import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import authModule, { AuthState } from './modules/auth.module';
import merchantBusiness, { BusinessState } from './modules/merchant/business.module';
import foodMenu, { FoodMenuState } from './modules/merchant/foodMenu.module';

export interface RootState {
    networkError: string,
    auth: AuthState,
    merchantBusiness: BusinessState,
    merchantFoodMenu: FoodMenuState,
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
        merchantBusiness: merchantBusiness,
        merchantFoodMenu: foodMenu
    },
    state: {
        networkError: '',
    } as RootState,
    mutations: {
        setNetworkError (state, errorMessage: string) {
            state.networkError = errorMessage;
        },
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