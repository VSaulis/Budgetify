import {BaseModel} from '../BaseModel';

export interface UsersListItem extends BaseModel {
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}
