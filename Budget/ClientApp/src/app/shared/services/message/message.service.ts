import {Injectable} from '@angular/core';
import {Message} from '../../models/Message';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private messagesBehaviorSubject = new BehaviorSubject<Message[]>([]);

    constructor() {
    }

    getMessagesBehaviorSubject(): BehaviorSubject<Message[]> {
        return this.messagesBehaviorSubject;
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
