import {BaseModel} from '../BaseModel';
import {Category} from '../category/Category';
import {UsersListItem} from '../user/UsersListItem';

export interface Operation extends BaseModel {
    date: string;
    description: string;
    amount: number;
    category: Category;
    user: UsersListItem;
}
