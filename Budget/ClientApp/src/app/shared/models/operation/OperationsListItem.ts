import {BaseModel} from '../BaseModel';
import {Category} from '../category/Category';

export interface OperationsListItem extends BaseModel {
    date: string;
    amount: number;
    description: string;
    category: Category;
}
