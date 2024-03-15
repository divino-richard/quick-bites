import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import authModule from './modules/auth.module';

export interface RootState {
    networkError: string;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
    },
    state: {
        networkError: '',
    },
    mutations: {
        setNetworkError (state, errorMessage: string) {
            state.networkError = errorMessage;
        },
    }
});

export function useStore () {
    return baseUseStore(key);
}