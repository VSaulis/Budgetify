import {Component, OnInit} from '@angular/core';
import {OperationsListItem} from '../../models/operation/OperationsListItem';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {DatatableColumn} from '../../models/datatable/DatatableColumn';
import {OperationService} from '../../services/operation/operation.service';
import {AppService} from '../../services/app/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationFormModalComponent} from './operation-form-modal/operation-form-modal.component';
import {MessagesTypes} from '../../enums/MessagesTypes';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../enums/ButtonClasses';
import {ListResponse} from '../../contracts/ListResponse';
import {OperationDetailsModalComponent} from './operation-details-modal/operation-details-modal.component';
import {OperationsFilterModalComponent} from './operations-filter-modal/operations-filter-modal.component';
import {OperationsFilter} from '../../contracts/operation/OperationsFilter';
import {SortTypes} from '../../enums/SortTypes';

@Component({
    selector: 'app-operations-table',
    templateUrl: './operations-table.component.html',
    styleUrls: ['./operations-table.component.scss']
})
export class OperationsTableComponent implements OnInit {

    filter: OperationsFilter = {};
    paging: Paging = {limit: 20, offset: 0};
    sort: Sort = {column: 'created', type: SortTypes.desc};

    operations: OperationsListItem[] = [];
    selectedOperationsIds: number[] = [];
    operationsCount = 0;
    operationsTotal = 0;
    colspan = 7;
    isLoading = true;
    columns: DatatableColumn[] = [
        {id: 'category', name: 'Category', sortable: true},
        {id: 'amount', name: 'Amount', sortable: true, class: 'center medium-column'},
        {id: 'date', name: 'Date', sortable: true, class: 'center medium-column'},
        {id: 'updated', name: 'Updated', sortable: true, class: 'center medium-column'},
        {id: 'created', name: 'Created', sortable: true, class: 'center medium-column'}
    ];

    constructor(private operationService: OperationService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getOperations();
    }

    selectAll(checked: boolean): void {
        if (checked) {
            this.selectedOperationsIds = this.operations.map((operation: OperationsListItem) => operation.id);
        } else {
            this.selectedOperationsIds = [];
        }
    }

    handleOperationSelect($event) {
        const checkbox = $event.target;

        if (checkbox.checked) {
            this.selectedOperationsIds.push(Number(checkbox.value));
        } else {
            this.selectedOperationsIds = this.selectedOperationsIds.filter((operationId: number) => operationId !== Number(checkbox.value));
        }
    }

    sortChange(sort: Sort): void {
        this.sort = sort;
        this.paging = {...this.paging, offset: 0};
        this.getOperations();
    }

    pagingChange(paging: Paging): void {
        this.paging = paging;
        this.getOperations();
    }

    filterChange(filter: OperationsFilter): void {
        this.filter = filter;
        this.paging = {...this.paging, offset: 0};
        this.getOperations();
    }

    openAddOperationFormModal(): void {
        const modalRef = this.modalService.open(OperationFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Operation is successfully added', type: MessagesTypes.success});
                this.getOperations();
            }
        });
    }

    openFilterOperationsModal(): void {
        const modalRef = this.modalService.open(OperationsFilterModalComponent, {backdrop: false, windowClass: 'wide-modal'});
        modalRef.componentInstance.filter = this.filter;

        modalRef.result.then((result) => {
            if (result) {
                this.filterChange(result);
            }
        });
    }

    openOperationDetailsModal(id: number): void {
        const modalRef = this.modalService.open(OperationDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;
    }

    openEditOperationFormModal(id: number): void {
        const modalRef = this.modalService.open(OperationFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Operation is successfully updated', type: MessagesTypes.success});
                this.getOperations();
            }
        });
    }

    openDeleteOperationFormModal(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: false});
        modalRef.componentInstance.heading = 'Are you sure that you want to delete this operation?';
        modalRef.componentInstance.buttonClass = ButtonClasses.danger;
        modalRef.componentInstance.action = () => this.operationService.deleteOperation(id);

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Operation is successfully deleted', type: MessagesTypes.success});
                this.getOperations();
            }
        });
    }

    private getOperations(): void {
        this.isLoading = true;
        this.operationService.getOperations(this.filter, this.sort, this.paging).subscribe((operationsListResponse: ListResponse<OperationsListItem>) => {
            this.operations = operationsListResponse.result;
            this.operationsCount = operationsListResponse.count;
            this.operationsTotal = operationsListResponse.total;
            this.isLoading = false;
        });
    }

}
