import {BaseModel} from '../BaseModel';
import {Operation} from '../operation/Operation';

export interface Notification extends BaseModel {
    operation: Operation;
}
