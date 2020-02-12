import {Component, Input} from '@angular/core';
import {Notification} from '../../models/notification/Notification';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationTypes} from '../../enums/NotificationTypes';

@Component({
    selector: 'app-notification-box',
    templateUrl: './notification-box.component.html',
    styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent {

    @Input() notification: Notification;

    constructor(private modalService: NgbModal) {
    }

    openDetailsModal(): void {
        if (this.notification.type === NotificationTypes.AddOperation) {
            this.openOperationDetailsModal(this.notification.entityId);
        }
    }

    private openOperationDetailsModal(id: number): void {
        const modalRef = this.modalService.open(OperationDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;
    }
}
