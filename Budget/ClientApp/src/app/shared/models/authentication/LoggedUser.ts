export interface LoggedUser {
    email: string;
    refreshToken: string;
    token: string;
    roles: string[];
    permissions: string[];
}
