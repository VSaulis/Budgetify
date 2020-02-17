import {Component, OnInit} from '@angular/core';
import {AppService} from '../../shared/services/app/app.service';
import {OperationService} from '../../shared/services/operation/operation.service';
import {ListResponse} from '../../shared/contracts/ListResponse';
import {OperationsListItem} from '../../shared/models/operation/OperationsListItem';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    operations: OperationsListItem[] = [];

    constructor(private appService: AppService,
                private operationService: OperationService) {
    }

    ngOnInit() {
        this.appService.setTitle('Dashboard');
        this.getOperations();
    }

    private getOperations(): void {
        this.operationService.getOperations(null, null, {limit: 5, offset: 0}).subscribe((operationsListResponse: ListResponse<OperationsListItem>) => {
             this.operations = operationsListResponse.result;
        });
    }
}
