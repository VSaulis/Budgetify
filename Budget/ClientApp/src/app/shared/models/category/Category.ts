import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface Category extends BaseModel {
    name: string;
    user: UsersListItem;
}
