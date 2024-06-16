
export interface Credentials {
    email: string;
    password: string;
}

export type UserType = 'Admin' | 'Rider' | 'Merchant' | 'Customer';

export type RegistrationStatus = 'initial' | 'completed'

export interface UserData {
    id?: string,
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: UserType;
    registration: RegistrationStatus;
}

export interface UserSession {
    token: string;
    userData: UserData;
}
