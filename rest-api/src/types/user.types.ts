export type UserType = 'admin' | 'merchant' | 'rider' | 'customer';
export type RegistrationType = 'initial' | 'completed' | 'approved' | 'denied';
export interface User {
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    address: string,
    registrationStatus: RegistrationType,
    userType: UserType,
    email: string,
    password: string,
}

export interface UserCredentials {
    email: string,
    password: string
}