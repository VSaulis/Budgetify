import {Component, OnInit} from '@angular/core';
import {Paging} from '../../../shared/contracts/Paging';
import {Sort} from '../../../shared/contracts/Sort';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {OperationsListItem} from '../../../shared/models/operation/OperationsListItem';
import {OperationService} from '../../../shared/services/operation/operation.service';
import {OperationFormModalComponent} from '../operation-form-modal/operation-form-modal.component';
import {AppService} from '../../../shared/services/app/app.service';
import {CategoriesListItem} from '../../../shared/models/category/CategoriesListItem';
import {DatatableColumn} from '../../../shared/models/datatable/DatatableColumn';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../../shared/enums/ButtonClasses';

@Component({
    selector: 'app-operations-list',
    templateUrl: './operations-list.component.html',
    styleUrls: ['./operations-list.component.scss']
})
export class OperationsListComponent implements OnInit {

    operations: OperationsListItem[] = [];
    selectedOperationsIds: number[] = [];
    operationsCount = 0;
    colspan = 8;
    paging: Paging;
    sort: Sort;
    isLoading = true;
    columns: DatatableColumn[] = [
        {id: 'category.name', name: 'Category', sortable: true},
        {id: 'amount', name: 'Amount', sortable: true, class: 'center medium-column'},
        {id: 'user', name: 'User', sortable: true, class: 'user-column'},
        {id: 'date', name: 'Date', sortable: true, class: 'center medium-column'},
        {id: 'updated', name: 'Updated', sortable: true, class: 'center medium-column'},
        {id: 'created', name: 'Created', sortable: true, class: 'center medium-column'}
    ];

    constructor(private operationService: OperationService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.appService.setTitle('Operations');
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
        this.getOperations();
    }

    pagingChange(paging: Paging): void {
        this.paging = paging;
        this.getOperations();
    }

    openAddOperationFormModal(): void {
        const modalRef = this.modalService.open(OperationFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'Operation is successfully added', type: MessagesTypes.success});
                this.getOperations();
            }
        });
    }

    openEditOperationFormModal(id: number): void {
        const modalRef = this.modalService.open(OperationFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'Operation is successfully updated', type: MessagesTypes.success});
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
                this.appService.addMessage({text: 'Operation is successfully deleted', type: MessagesTypes.success});
                this.getOperations();
            }
        });
    }

    private getOperations(): void {
        this.isLoading = true;
        this.operationService.getOperations(null, this.sort, this.paging).subscribe((operationsListResponse: ListResponse<OperationsListItem>) => {
            this.operations = operationsListResponse.result;
            this.operationsCount = operationsListResponse.count;
            this.isLoading = false;
        });
    }

}
