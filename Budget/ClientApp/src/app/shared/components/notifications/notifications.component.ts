import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app/app.service';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Notification} from '../../models/notification/Notification';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    notifications: Notification[];

    constructor(private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    openOperationDetailsModal(id: number): void {
        const modalRef = this.modalService.open(OperationDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;
    }

    private getNotifications(): void {
        this.appService.getNotifications().subscribe((notifications: Notification[]) => {
            this.notifications = notifications;
        });
    }
}
