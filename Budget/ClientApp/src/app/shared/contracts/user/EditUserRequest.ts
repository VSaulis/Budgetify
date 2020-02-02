export interface EditUserRequest {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    version: string;
}
