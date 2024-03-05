import { UserSession } from "@/types/user.types";

export function getSession (): UserSession | null {
    const session = localStorage.getItem('user-session');
    if(!session) return null;
    return JSON.parse(session);
}

export function setSession(session: UserSession) {
    localStorage.setItem('user-session', JSON.stringify(session));
}

export function logout() {
    localStorage.setItem('user-session', '');
}
