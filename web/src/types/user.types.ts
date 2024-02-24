
export interface Credentials {
    email: string;
    password: string;
}

export type UserType = 'admin' | 'rider' | 'merchant' | 'customer';

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: UserType;
}

export interface UserSession {
    token: string;
    userData: UserData;
}
