import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface CategoriesListItem extends BaseModel {
    name: string;
    total: number;
    user: UsersListItem;
}
