import {Component, OnInit} from '@angular/core';
import {NotificationsListItem} from '../../models/notification/NotificationsListItem';
import {NotificationService} from '../../services/notification/notification.service';
import {ListResponse} from '../../contracts/ListResponse';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {SortTypes} from '../../enums/SortTypes';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notifications-dropdown',
    templateUrl: './notifications-dropdown.component.html',
    styleUrls: ['./notifications-dropdown.component.scss']
})
export class NotificationsDropdownComponent implements OnInit {

    notifications: NotificationsListItem[] = [];
    notificationsCount: number;
    isLoading = true;
    paging: Paging = {limit: 5, offset: 0};
    sort: Sort = {type: SortTypes.desc, column: 'created'};

    constructor(private notificationService: NotificationService,
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
        this.notificationService.getNotifications(this.sort, this.paging).subscribe((notificationsListResponse: ListResponse<NotificationsListItem>) => {
            this.notifications = notificationsListResponse.result;
            this.notificationsCount = notificationsListResponse.count;
            this.isLoading = false;
        });
    }
}
