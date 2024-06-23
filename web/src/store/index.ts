import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore,  Store } from 'vuex';
import { MenuState } from './states/menu.state';
import menuModule from './modules/menu.module';
import { AuthState } from './states/auth.state';
import authModule from './modules/auth.module';
import userModule from './modules/user.module';
import { UserState } from './states/user.state';
import { RestaurantState } from './states/restaurant.state';
import restaurantModule from './modules/restaurant.module';
import { UploadState } from './states/upload.state';
import uploadModule from './modules/upload.module';

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