import {Component, OnInit} from '@angular/core';
import {Message} from '../../models/Message';
import {MessageService} from '../../services/message/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    messages: Message[] = [];

    constructor(private messageService: MessageService) {
    }

    ngOnInit() {
        this.messageService.getMessagesBehaviorSubject().subscribe((messages: Message[]) => {
            this.messages = messages;
        });
    }

    removeMessage(message: Message): void {
        this.messageService.removeMessage(message);
    }

}
