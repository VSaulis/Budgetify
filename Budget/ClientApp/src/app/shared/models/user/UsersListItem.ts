import {BaseModel} from '../BaseModel';

export interface UsersListItem extends BaseModel {
    email: string;
    roles: string[];
}
