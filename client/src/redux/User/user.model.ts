export interface User {
    access_token: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface UserState {
    user: User | null,
    loggedIn: boolean
}
