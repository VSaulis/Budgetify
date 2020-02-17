import {BaseModel} from '../BaseModel';
import {Category} from '../category/Category';

export interface Operation extends BaseModel {
    date: string;
    description: string;
    amount: number;
    category: Category;
}
