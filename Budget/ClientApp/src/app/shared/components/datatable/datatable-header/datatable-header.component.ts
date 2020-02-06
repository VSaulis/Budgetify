import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatatableColumn} from '../../../models/datatable/DatatableColumn';
import {Sort} from '../../../contracts/Sort';
import {SortTypes} from '../../../enums/SortTypes';
import {BehaviorSubject} from 'rxjs';
import {Paging} from '../../../contracts/Paging';

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
    @Input() sort: Sort;

    @Output() sortChange = new EventEmitter<Sort>();
    @Output() selectAll = new EventEmitter<boolean>();

    sortTypes = SortTypes;

    updateSort(column: string): void {
        if (this.sort.column === column) {
            this.sort.type = this.sort.type === SortTypes.desc ? SortTypes.asc : SortTypes.desc;
        } else {
            this.sort.type = SortTypes.desc;
        }

        this.sort.column = column;
        this.sortChange.emit(this.sort);
    }
}
