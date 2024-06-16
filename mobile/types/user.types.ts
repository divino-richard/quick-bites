
export type UserType = 'Customer' | 'Rider' | 'Merchant';

export interface Credentials {
    email: string
    password: string
}

export interface UserSession {
    token: string
    userData: {
        id: string
        firstName: string
        lastName: string
        phoneNumber: string
        email: string
        userType: UserType
        avatar: string
    }
}

