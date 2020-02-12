import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface Notification extends BaseModel {
    notifier: UsersListItem;
    date: string;
    stringValue?: string;
    decimalValue?: number;
    type: string;
    entityId?: number;
}
