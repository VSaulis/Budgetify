import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationService} from '../../../services/operation/operation.service';
import {Operation} from '../../../models/operation/Operation';

@Component({
    selector: 'app-operation-details-modal',
    templateUrl: './operation-details-modal.component.html',
    styleUrls: ['./operation-details-modal.component.scss']
})
export class OperationDetailsModalComponent implements OnInit {

    @Input() id: number;
    isLoading = true;
    operation: Operation;

    constructor(public activeModal: NgbActiveModal,
                private operationService: OperationService) {
    }

    ngOnInit() {
        this.getOperation(this.id);
    }

    private getOperation(id: number): void {
        this.operationService.getOperation(id).subscribe((operation: Operation) => {
            this.operation = operation;
            this.isLoading = false;
        });
    }

}
