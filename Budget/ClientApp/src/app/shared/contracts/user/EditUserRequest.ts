export interface EditUserRequest {
    id: number;
    email: string;
    roles: string[];
    version: string;
}
