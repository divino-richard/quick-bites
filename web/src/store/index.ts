import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import authModule, { AuthState } from './modules/auth.module';
import businessModule from './modules/merchant/business.module';

export interface RootState {
    networkError: string,
    auth: AuthState
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
        merchantBusiness: businessModule
    },
    state: {
        networkError: '',
    } as RootState,
    mutations: {
        setNetworkError (state, errorMessage: string) {
            state.networkError = errorMessage;
        },
    }
});

export function useStore () {
    return baseUseStore(key);
}