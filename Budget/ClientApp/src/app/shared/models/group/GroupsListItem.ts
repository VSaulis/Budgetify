import {BaseModel} from '../BaseModel';
import {UsersListItem} from '../user/UsersListItem';

export interface GroupsListItem extends BaseModel {
    name: string;
    users: UsersListItem[];
    todayBalance: number;
    totalBalance: number;
}
