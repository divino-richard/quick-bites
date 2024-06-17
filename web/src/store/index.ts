import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import { MenuState } from './modules/menu/state';
import menuModule from './modules/menu';
import { AuthState } from './modules/auth/state';
import authModule from './modules/auth';
import userModule from './modules/user';
import { UserState } from './modules/user/state';
import { RestaurantState } from './modules/restaurant/state';
import restaurantModule from './modules/restaurant';
import { UploadState } from './modules/upload/state';
import uploadModule from './modules/upload';

export interface RootState {
    networkError: string;
    auth: AuthState;
    menu: MenuState;
    user: UserState;
    restaurant: RestaurantState;
    upload: UploadState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        auth: authModule,
        menu: menuModule,
        user: userModule,
        restaurant: restaurantModule,
        upload: uploadModule,
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