import {BaseModel} from '../BaseModel';
import {Category} from '../category/Category';
import {UsersListItem} from '../user/UsersListItem';

export interface OperationsListItem extends BaseModel {
    date: string;
    amount: number;
    description: string;
    category: Category;
    user: UsersListItem;
}
