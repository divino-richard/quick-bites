
export interface Credentials {
    email: string;
    password: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: string;
}

export interface UserSession {
    token: string;
    userData: UserData;
}
