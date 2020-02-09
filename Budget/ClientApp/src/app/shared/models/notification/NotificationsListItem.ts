import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface NotificationsListItem extends BaseModel {
    notifier: UsersListItem;
    type: string;
}
