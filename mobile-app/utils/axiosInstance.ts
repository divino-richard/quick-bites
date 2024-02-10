import * as SecureStore from "expo-secure-store"
import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios"

import { UserSession } from "../types/user.types"

const UNAUTHORIZED = 401

export function getAxiosInstance(
    session: UserSession,
    logout: () => void,
): AxiosInstance {
    const axiosInstance = axios.create()

    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            config.baseURL = "http://192.168.45.114:5000"
            config.timeout = 10000
            config.headers["Content-Type"] = "application/json"
            config.headers["Authorization"] = `Bearer ${session?.token}`

            return config
        },
    )

    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error: AxiosError) => {
            if (error.response?.status === UNAUTHORIZED) {
                logout()
            }
            return Promise.reject(error)
        },
    )

    return axiosInstance
}
