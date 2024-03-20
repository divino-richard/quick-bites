
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession } from './session.utils';

const api = axios.create();

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const session = getSession();

        if(session) {
            config.headers['Authorization'] = `Bearer ${session?.token}`
        }
        
        config.baseURL = "http://localhost:5100";
        config.timeout = 10000;

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // const router = useRouter();
        // const store = useStore();

        if (error.code === 'ERR_NETWORK') {
            // store.commit('setNetworkError', 'Network connection error');
        }

        const statusCode = error.response?.status

        if (statusCode === 401 || statusCode === 403) {
            localStorage.removeItem('user-session');
            // router.replace('/')
        }

        return Promise.reject(error)
    }
)

export default api;
