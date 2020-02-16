import {BaseModel} from '../BaseModel';

export interface User extends BaseModel {
    initials: string;
    email: string;
    firstName: string;
    lastName: string;
}
