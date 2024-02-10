import React, { useState } from "react"
import axios, { AxiosError, AxiosInstance } from "axios"

import { Credentials, UserSession } from "../types/user.types"
import { getAxiosInstance } from "./axiosInstance"
import { useStorageState } from "./useStorageState"

type LoginPayloadStatus = "error" | "success"
interface LoginPayload {
    status: LoginPayloadStatus
    message?: string
}
const AuthContext = React.createContext<{
    login: ({ email, password }: Credentials) => Promise<LoginPayload> | null
    logout: () => void
    axiosInstance: AxiosInstance | null
    session?: UserSession | null
    isLoading: boolean
}>({
    login: () => null,
    logout: () => null,
    axiosInstance: null,
    session: null,
    isLoading: false,
})

// This hook can be used to access the user info.
export function useContextProvider() {
    const value = React.useContext(AuthContext)
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />",
            )
        }
    }

    return value
}

export function ContextProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session")
    const [loginPending, setLoginPending] = useState(false)

    const logout = () => {
        setSession(null)
    }
    const axiosInstance = session
        ? getAxiosInstance(JSON.parse(session), logout)
        : null

    return (
        <AuthContext.Provider
            value={{
                login: async (credentials): Promise<LoginPayload> => {
                    setLoginPending(true)

                    try {
                        const response = await axios.post(
                            "http://192.168.45.114:5000/auth/login",
                            credentials,
                        )

                        if (response) {
                            setSession(JSON.stringify(response.data))
                        }

                        setLoginPending(false)
                        return {
                            status: "success",
                        }
                    } catch (error) {
                        const axiosError = error as AxiosError
                        const errorResponse: any = axiosError.response
                        const statusCode = axiosError.response?.status

                        let errorMessage = ""
                        if (statusCode === 401) {
                            errorMessage = errorResponse?.data?.message
                        } else {
                            errorMessage =
                                "Something went wrong. Please try again later."
                        }

                        setLoginPending(false)
                        return {
                            status: "error",
                            message: errorMessage,
                        }
                    }
                },
                logout: () => {
                    setSession(null)
                },
                session: session ? JSON.parse(session) : null,
                isLoading: loginPending || isLoading,
                axiosInstance,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
