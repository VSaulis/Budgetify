import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatatableColumn} from '../../../models/datatable/DatatableColumn';
import {Sort} from '../../../contracts/Sort';
import {SortTypes} from '../../../enums/SortTypes';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-datatable-header',
    templateUrl: './datatable-header.component.html',
    styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent {

    @Input() columns: DatatableColumn[];
    @Input() isLoading: boolean;
    @Input() rowsCount: number;
    @Input() selectedRowsCount: number;
    @Input() colspan: number;

    @Output() sort = new BehaviorSubject<Sort>({
        type: SortTypes.desc,
        column: 'created'
    });

    @Output() selectAll = new EventEmitter<boolean>();

    sortTypes = SortTypes;

    updateSort(column: string): void {
        const sort = this.sort.value;

        if (sort.column === column) {
            sort.type = sort.type === SortTypes.desc ? SortTypes.asc : SortTypes.desc;
        } else {
            sort.type = SortTypes.desc;
        }

        sort.column = column;
        this.sort.next(sort);
    }
}
