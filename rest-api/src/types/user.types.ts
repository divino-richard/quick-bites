export type UserType = 'customer' | 'driver' | 'merchant'
export interface User {
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    address: string,
    userType: UserType,
    email: string,
    password: string,
}

export interface UserCredentials {
    email: string,
    password: string
}