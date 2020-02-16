import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../../models/message/Message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private messagesBehaviorSubject = new BehaviorSubject<Message[]>([]);

    constructor() {
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

    removeMessages(): void {
        this.messagesBehaviorSubject.next([]);
    }
}
