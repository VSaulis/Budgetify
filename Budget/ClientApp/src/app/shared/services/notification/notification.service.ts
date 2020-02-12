import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ListResponse} from '../../contracts/ListResponse';
import {Sort} from '../../contracts/Sort';
import {Paging} from '../../contracts/Paging';
import {Notification} from '../../models/notification/Notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notificationsUrl = `${environment.apiUrl}/notifications`;
    private hubConnection: HubConnection;
    private notifications = new BehaviorSubject<Notification[]>([]);

    constructor(private http: HttpClient) {
    }

    getNotifications(sort: Sort = null, paging: Paging = null): Observable<ListResponse<Notification>> {
        const params: any = {};

        if (sort) {
            if (sort.column) {
                params.sortColumn = sort.column;
            }

            if (sort.type) {
                params.sortType = sort.type;
            }
        }

        if (paging) {
            if (paging.limit) {
                params.limit = paging.limit;
            }

            if (paging.offset || paging.offset === 0) {
                params.offset = paging.offset;
            }
        }

        return this.http.get<ListResponse<Notification>>(this.notificationsUrl, {params});
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
