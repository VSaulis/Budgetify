import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Profile} from '../../models/profile/Profile';
import {LoggedUser} from '../../models/authentication/LoggedUser';
import {Message} from '../../models/message/Message';
import {NotificationService} from '../notification/notification.service';
import {GroupsListItem} from '../../models/group/GroupsListItem';
import {MessageService} from '../message/message.service';
import {GroupService} from '../group/group.service';
import {ProfileService} from '../profile/profile.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {


    private title = new BehaviorSubject<string>(null);
    private loggedUser = new BehaviorSubject<LoggedUser>(null);


    constructor(private notificationService: NotificationService,
                private messageService: MessageService,
                private groupService: GroupService,
                private profileService: ProfileService) {
    }

    // Title

    setTitle(title: string): void {
        this.title.next(title);
    }

    getTitle(): Observable<string> {
        return this.title.asObservable();
    }

    // Profile

    getProfile(): Observable<Profile> {
        return this.profileService.getCurrentProfile();
    }

    setProfile(profile: Profile): void {
        this.profileService.setProfile(profile);
    }

    // Logged user

    setLoggedUser(loggedUser: LoggedUser): void {
        this.loggedUser.next(loggedUser);
    }

    getLoggedUser(): Observable<LoggedUser> {
        return this.loggedUser.asObservable();
    }

    // Group

    setGroup(group: GroupsListItem): void {
        this.groupService.selectGroup(group);
    }

    getGroup(): Observable<GroupsListItem> {
        return this.groupService.getSelectedGroup();
    }

    // Messages

    getMessages(): Observable<Message[]> {
        return this.messageService.getMessages();
    }

    setMessage(message: Message): void {
        this.messageService.setMessage(message);
    }

    addMessage(message: Message): void {
        this.messageService.addMessage(message);
    }

    removeMessage(message: Message): void {
        this.messageService.removeMessage(message);
    }

    removeMessages(): void {
        this.messageService.removeMessages();
    }
}
