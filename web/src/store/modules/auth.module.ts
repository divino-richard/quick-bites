import { Credentials, UserSession } from '@/types/user.types'; 
import { loginUser } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { Module } from 'vuex';
import { RootState } from '@/store';
import api from '@/utils/api';

export interface AuthState {
    session: UserSession | null;
    loginLoading: boolean;
    loginError: string;
    networkError: string;
}

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        session: null,
        loginLoading: false,
        loginError: '',
    } as AuthState,
    mutations: {
        setSession (state, session: UserSession) {
            state.session = session;
            localStorage.setItem('user-session', JSON.stringify(session));
        },
        setLoginError (state, errorMessage: string) {
            state.loginError = errorMessage
        },
        setLoginLoading (state, loading: boolean) {
            state.loginLoading = loading;
        },
        logOut (state) {
            localStorage.setItem('user-session', '');
            state.session = null;   
        }
    },
    actions: {
        login: async({ state, commit}, credentials: Credentials) => {
            commit('setLoginLoading', true);
            try {
                const response = await api.post('/auth/login', credentials);
                commit('setSession', response.data);
            } catch (error) {
                if(error instanceof AxiosError) {
                    commit('setLoginError', error.response?.data.message);
                    return;
                }
                state.loginError = 'Something went wrong!';
            } finally {
                // commit('setLoginLoading', false);
            }
        }
    },
    getters: {
        getSession (): UserSession | null {
            const session = localStorage.getItem('user-session');
            if(!session) return null;
            return JSON.parse(session);
        },
        getLoginLoading: (state): boolean => {
            return state.loginLoading;
        }
    }
};

export default authModule;
