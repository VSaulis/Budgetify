import {Component, OnInit} from '@angular/core';
import {Message} from '../../models/message/Message';
import {AppService} from '../../services/app/app.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    messages: Message[] = [];

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.getMessages().subscribe((messages: Message[]) => {
            this.messages = messages;
        });
    }

    removeMessage(message: Message): void {
        this.appService.removeMessage(message);
    }

}
