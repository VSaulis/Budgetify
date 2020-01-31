import {SortTypes} from '../enums/SortTypes';

export interface Sort {
    column: string;
    type: SortTypes;
}
