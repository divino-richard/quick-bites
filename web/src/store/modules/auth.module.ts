import { Credentials, UserSession } from '@/types/user.types'; 
import { loginUser } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { Module } from 'vuex';
import { RootState } from '@/store';

export interface AuthState {
    session: UserSession | null;
    loginLoading: boolean;
    loginError: string;
    networkError: string;
}

const authModule: Module<AuthState, RootState> = {
    state: {
        session: null,
        loginLoading: false,
        loginError: '',
        networkError: '',
    },
    mutations: {
        setSession (state, session: UserSession) {
            state.session = session;
            localStorage.setItem('user-session', JSON.stringify(session));
        },
        setNetworkError (state, errorMessage: string) {
            state.networkError = errorMessage;
        },
        logOut (state) {
            localStorage.setItem('user-session', '');
            state.session = null;   
        }
    },
    actions: {
        login: async({ state, commit}, credentials: Credentials) => {
            state.loginLoading = true;
            try {
                const response = await loginUser(credentials);
                commit('setSession', response.data);
            } catch (error) {
                if(error instanceof AxiosError) {
                    state.loginError = error.response?.data.message;
                    return;
                }
                state.loginError = 'Something went wrong!';
            } finally {
                state.loginLoading = false;
            }
        }
    },
    getters: {
        getSession (): UserSession | null {
            const session = localStorage.getItem('user-session');
            if(!session) return null;
            return JSON.parse(session);
        }
    }
};

export default authModule;
