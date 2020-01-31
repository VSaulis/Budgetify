import {DatatableActionsTypes} from '../../enums/DatatableActionsTypes';

export interface DatatableAction {
    id?: number;
    type: DatatableActionsTypes;
}
