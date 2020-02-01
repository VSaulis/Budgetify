import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Paging} from '../../../shared/contracts/Paging';
import {Sort} from '../../../shared/contracts/Sort';
import {SortTypes} from '../../../shared/enums/SortTypes';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {OperationsListItem} from '../../../shared/models/operation/OperationsListItem';
import {OperationService} from '../../../shared/services/operation/operation.service';
import {OperationFormModalComponent} from '../operation-form-modal/operation-form-modal.component';
import {AppService} from '../../../shared/services/app/app.service';

@Component({
    selector: 'app-operations-list',
    templateUrl: './operations-list.component.html',
    styleUrls: ['./operations-list.component.scss']
})
export class OperationsListComponent implements OnInit {

    operations: OperationsListItem[] = [];
    operationsCount = 0;

    paging = new BehaviorSubject<Paging>({
        limit: 20,
        offset: 0
    });

    sort = new BehaviorSubject<Sort>({
        type: SortTypes.desc,
        column: 'created'
    });

    constructor(private operationService: OperationService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.appService.setTitle('Operations');
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

    private getOperations(): void {
        this.operationService.getOperations(null, this.sort.value, this.paging.value).subscribe((operationsListResponse: ListResponse<OperationsListItem>) => {
            this.operations = operationsListResponse.result;
            this.operationsCount = operationsListResponse.count;
        });
    }

}
