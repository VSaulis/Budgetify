import {BaseModel} from '../BaseModel';

export interface User extends BaseModel {
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}
