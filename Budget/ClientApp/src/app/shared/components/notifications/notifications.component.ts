import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app/app.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    notifications: Notification[];

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    private getNotifications(): void {
        this.appService.getNotifications().subscribe((notifications: Notification[]) => {
            this.notifications = notifications;
            console.log(notifications);
        });
    }
}
