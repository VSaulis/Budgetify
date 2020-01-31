import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {ListResponse} from '../../contracts/ListResponse';
import {DatatableColumn} from '../../models/datatable/DatatableColumn';
import {BaseModel} from '../../models/BaseModel';
import {switchMap, tap} from 'rxjs/operators';
import {BaseFilter} from '../../contracts/BaseFilter';
import {DatatableActionsTypes} from '../../enums/DatatableActionsTypes';
import {DatatableAction} from '../../models/datatable/DatatableAction';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

    @Input() refresh: EventEmitter<void>;
    @Input() columns: DatatableColumn[] = [];
    @Input() fetchRows: (filter: BaseFilter, sort: Sort, paging: Paging) => Observable<ListResponse<BaseModel>>;

    @Input()
    set filter(filter: BaseFilter) {
        this.filterBehaviorSubject.next(filter);
    }

    @Output() action = new EventEmitter<DatatableAction>();

    colspan: number;
    rows: BaseModel[] = [];
    selectedRowsIds: number[] = [];
    count = 0;
    isLoading = true;
    sortBehaviorSubject = new BehaviorSubject<Sort>(null);
    pagingBehaviorSubject = new BehaviorSubject<Paging>(null);
    filterBehaviorSubject = new BehaviorSubject<BaseFilter>(null);
    actionsTypes = DatatableActionsTypes;

    ngOnInit() {
        this.colspan = this.columns.length + 4;
        this.getRows();
        this.refresh.subscribe(() => {
            this.getRows();
        });
    }

    selectAll(checked: boolean): void {
        if (checked) {
            this.selectedRowsIds = this.rows.map((model: BaseModel) => model.id);
        } else {
            this.selectedRowsIds = [];
        }
    }

    handleRowSelect($event) {
        const checkbox = $event.target;

        if (checkbox.checked) {
            this.selectedRowsIds.push(Number(checkbox.value));
        } else {
            this.selectedRowsIds = this.selectedRowsIds.filter((modelId: number) => modelId !== Number(checkbox.value));
        }
    }

    private getRows(): void {
        combineLatest([this.filterBehaviorSubject, this.sortBehaviorSubject, this.pagingBehaviorSubject])
            .pipe(tap(() => this.isLoading = true), switchMap((s: [BaseFilter, Sort, Paging]) => this.fetchRows(s[0], s[1], s[2])))
            .subscribe((listResponse: ListResponse<BaseModel>) => {
                this.rows = listResponse.result;
                this.count = listResponse.count;
                this.isLoading = false;
            });
    }
}
