import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatatableColumn} from '../../../models/datatable/DatatableColumn';
import {Sort} from '../../../contracts/Sort';
import {SortTypes} from '../../../enums/SortTypes';
import {BehaviorSubject} from 'rxjs';
import {DatatableAction} from '../../../models/datatable/DatatableAction';
import {DatatableActionsTypes} from '../../../enums/DatatableActionsTypes';

@Component({
    selector: 'app-datatable-header',
    templateUrl: './datatable-header.component.html',
    styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent implements OnInit {

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
    @Output() action = new EventEmitter<DatatableAction>();

    sortTypes = SortTypes;
    actionsTypes = DatatableActionsTypes;

    ngOnInit(): void {
        this.columns = this.columns.concat([
            {
                id: 'updated',
                name: 'Updated',
                sortable: true,
                centered: true
            },
            {
                id: 'created',
                name: 'Created',
                sortable: true,
                centered: true
            }
        ]);
    }

    onSelectAllChange($event): void {
        this.selectAll.emit($event.target.checked);
    }

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
