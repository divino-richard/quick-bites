
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'vue-router';
import { getSession } from './session.utils';

const api = axios.create();

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const session = getSession();

        if(session) {
            config.headers['Authorization'] = `Bearer ${session?.token}`
        }
        
        config.baseURL = "http://localhost:5000";
        config.timeout = 10000;
        config.headers["Content-Type"] = "application/json";

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("Response: ", response);
        return response;
    },
    (error: AxiosError) => {
        const router = useRouter();

        if (error.code === 'ERR_NETWORK') {
            // TODO: Set network error from the global state
            console.log(error.code)
        }

        const statusCode = error.response?.status

        if (statusCode === 401 || statusCode === 403) {
            localStorage.removeItem('user-session');
            router.replace('/')
        }

        return Promise.reject(error)
    }
)

export default api;
