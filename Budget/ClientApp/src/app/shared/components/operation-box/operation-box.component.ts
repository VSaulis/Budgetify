import {Component, Input, OnInit} from '@angular/core';
import {Operation} from '../../models/operation/Operation';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-operation-box',
    templateUrl: './operation-box.component.html',
    styleUrls: ['./operation-box.component.scss']
})
export class OperationBoxComponent implements OnInit {

    @Input() operation: Operation;

    constructor(private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    openOperationDetailsModal(id: number): void {
        const modalRef = this.modalService.open(OperationDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;
    }
}
