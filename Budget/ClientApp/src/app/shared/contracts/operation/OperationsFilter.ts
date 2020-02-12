import {BaseFilter} from '../BaseFilter';

export interface OperationsFilter extends BaseFilter {
    dateFrom?: string;
    dateTo?: string;
    amountFrom?: number;
    amountTo?: number;
    categoriesIds?: number[];
    usersIds?: number[];
}
