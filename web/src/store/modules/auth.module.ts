import { Credentials, UserSession } from '@/types/user.types'; 
import { AxiosError } from 'axios';
import { Module } from 'vuex';
import { RootState } from '@/store';
import api from '@/utils/api';
import { getSession, setSession, logout } from '@/utils/session.utils';

export interface AuthState {
    session: UserSession | null;
    loginLoading: boolean;
    loginError: string;
}

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        session: getSession(),
        loginLoading: false,
        loginError: '',
    } as AuthState,
    mutations: {
        setLoggedIn (state, session: UserSession) {
            setSession(session);
            state.loginError = '';
            state.session = session
        },
        setLoginError (state, errorMessage: string) {
            state.loginError = errorMessage
        },
        setLoginLoading (state, loading: boolean) {
            state.loginLoading = loading;
        },
        logOut (state) {
            logout();
            state.session = null;
        }
    },
    actions: {
        async login ({ commit}, credentials: Credentials) {
            commit('setLoginLoading', true);
            try {
                const response = await api.post('/auth/login', credentials);
                commit('setLoggedIn', response.data);
            } catch (error) {
                if(error instanceof AxiosError) {
                    commit('setLoginError', error.response?.data.message);
                    return;
                }
                commit('setLoginError', 'Something went wrong!');
            } finally {
                commit('setLoginLoading', false);
            }
        }
    },
    getters: {
        getSession (state) {
            return state.session;
        },
    }
};

export default authModule;
