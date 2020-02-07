import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ListResponse} from '../../contracts/ListResponse';
import {NotificationsListItem} from '../../models/notification/NotificationsListItem';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notificationsUrl = `${environment.apiUrl}/notifications`;
    private hubConnection: HubConnection;
    private notifications = new BehaviorSubject<Notification[]>([]);

    constructor(private http: HttpClient) {
    }

    getNotifications(): Observable<ListResponse<NotificationsListItem>> {
        return this.http.get<ListResponse<NotificationsListItem>>(this.notificationsUrl);
    }

    getNotificationsObservable(): Observable<Notification[]> {
        return this.notifications.asObservable();
    }

    disconnect() {
        if (this.hubConnection) {
            this.hubConnection.stop();
            this.hubConnection = null;
        }
    }

    connect(accessToken) {
        if (!this.hubConnection) {

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${environment.apiUrl}/notify`, {accessTokenFactory: () => accessToken})
                .build();

            this.hubConnection.on('Notify', (notification: Notification) => {
                this.pushNotification(notification);
            });

            this.hubConnection.start().catch(err => console.error(err));
        }
    }

    private pushNotification(notification: Notification): void {
        const notifications = this.notifications.value;
        notifications.push(notification);
        this.notifications.next(notifications);
    }
}
