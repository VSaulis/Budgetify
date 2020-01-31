import {BaseResponse} from './BaseResponse';

export interface ResultResponse<T> extends BaseResponse {
    result: T;
}
