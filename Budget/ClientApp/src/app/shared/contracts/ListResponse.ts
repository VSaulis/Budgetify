import {ResultResponse} from './ResultResponse';

export interface ListResponse<T> extends ResultResponse<T[]> {
    total?: number;
    count: number;
}
