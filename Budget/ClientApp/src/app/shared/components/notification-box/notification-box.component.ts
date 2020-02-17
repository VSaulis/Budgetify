import {Component, Input} from '@angular/core';
import {Notification} from '../../models/notification/Notification';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notification-box',
    templateUrl: './notification-box.component.html',
    styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent {

    @Input() notification: Notification;

    constructor(private modalService: NgbModal) {
    }

    openOperationDetailsModal(): void {
        const modalRef = this.modalService.open(OperationDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = this.notification.operation.id;
    }
}
