import {BaseFilter} from '../BaseFilter';

export interface CategoriesFilter extends BaseFilter {
    totalFrom?: number;
    totalTo?: number;
}
