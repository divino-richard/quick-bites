
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create();

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const session = localStorage.getItem('user-session');

        if(session) {
            const parsedSession = JSON.parse(session);
            if(parsedSession?.token) {
                config.headers['Authorization'] = `Bearer ${parsedSession?.token}`
            }
        }
        
        config.baseURL = "http://localhost:5100";
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
        if (error.code === 'ERR_NETWORK') {

        }

        if (error.response?.status === 401) {
            localStorage.removeItem('user-session');
        }

        return Promise.reject(error)
    }
)

export default api;
