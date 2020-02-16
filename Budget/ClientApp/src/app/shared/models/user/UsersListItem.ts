import {BaseModel} from '../BaseModel';

export interface UsersListItem extends BaseModel {
    initials: string;
    email: string;
    firstName: string;
    lastName: string;
}
