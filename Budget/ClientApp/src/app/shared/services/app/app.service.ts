import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Profile} from '../../models/profile/Profile';
import {LoggedUser} from '../../models/authentication/LoggedUser';
import {Message} from '../../models/message/Message';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private messagesBehaviorSubject = new BehaviorSubject<Message[]>([]);
    private title = new BehaviorSubject<string>(null);
    private profile = new BehaviorSubject<Profile>(null);
    private loggedUser = new BehaviorSubject<LoggedUser>(null);

    constructor() {
    }

    setTitle(title: string): void {
        this.title.next(title);
    }

    getTitle(): Observable<string> {
        return this.title.asObservable();
    }

    getProfile(): Observable<Profile> {
        return this.profile.asObservable();
    }

    setProfile(profile: Profile): void {
        this.profile.next(profile);
    }

    setLoggedUser(loggedUser: LoggedUser): void {
        this.loggedUser.next(loggedUser);
    }

    getLoggedUser(): Observable<LoggedUser> {
        return this.loggedUser.asObservable();
    }

    getMessages(): Observable<Message[]> {
        return this.messagesBehaviorSubject.asObservable();
    }

    setMessage(message: Message): void {
        this.messagesBehaviorSubject.next([message]);
    }

    addMessage(message: Message): void {
        const messages = this.messagesBehaviorSubject.value;
        messages.push(message);
        this.messagesBehaviorSubject.next(messages);
    }

    removeMessage(message: Message): void {
        let messages = this.messagesBehaviorSubject.value;
        messages = messages.filter((m: Message) => m !== message);
        this.messagesBehaviorSubject.next(messages);
    }
}
