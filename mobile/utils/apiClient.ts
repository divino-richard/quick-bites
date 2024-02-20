import * as SecureStore from "expo-secure-store"
import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios"

const UNAUTHORIZED = 401

const apiClient = axios.create()

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const session = await SecureStore.getItemAsync('session');
        let parsedSession;
        if(session) {
            parsedSession = JSON.parse(session);
        }

        config.baseURL = "http://192.168.1.148:5000"
        config.timeout = 10000
        config.headers["Content-Type"] = "application/json"
        config.headers["Authorization"] = `Bearer ${parsedSession ? parsedSession.token : ''}`

        return config
    },
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error: AxiosError) => {
        if (error.response?.status === UNAUTHORIZED) {
            SecureStore.deleteItemAsync('session').then(() => {
                console.log("Logged out")
            }).catch((error: Error) => {
                console.log(error)
            })
        }
        return Promise.reject(error)
    },
)

export default apiClient;