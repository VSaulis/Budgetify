import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification/notification.service';
import {ListResponse} from '../../contracts/ListResponse';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {SortTypes} from '../../enums/SortTypes';
import {OperationDetailsModalComponent} from '../operations-table/operation-details-modal/operation-details-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Notification} from '../../models/notification/Notification';
import {AppService} from '../../services/app/app.service';

@Component({
    selector: 'app-notifications-dropdown',
    templateUrl: './notifications-dropdown.component.html',
    styleUrls: ['./notifications-dropdown.component.scss']
})
export class NotificationsDropdownComponent implements OnInit {

    notifications: Notification[] = [];
    notificationsCount: number;
    isLoading = true;
    paging: Paging = {limit: 5, offset: 0};
    sort: Sort = {type: SortTypes.desc, column: 'created'};

    constructor(private notificationService: NotificationService,
                private appService: AppService) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    private getNotifications(): void {
        this.appService.getNotifications().subscribe(() => {
            this.isLoading = true;
            this.notificationService.getNotifications(this.sort, this.paging).subscribe((notificationsListResponse: ListResponse<Notification>) => {
                this.notifications = notificationsListResponse.result;
                this.notificationsCount = notificationsListResponse.count;
                this.isLoading = false;
            });
        });
    }
}
