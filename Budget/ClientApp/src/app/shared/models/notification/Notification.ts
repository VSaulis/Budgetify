import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface Notification extends BaseModel {
    notifier: UsersListItem;
    type: string;
}
