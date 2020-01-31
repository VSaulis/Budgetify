import {Component, OnInit} from '@angular/core';
import {MessageService} from '../shared/services/message/message.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(private messageService: MessageService) {
    }

    ngOnInit() {

    }

}
