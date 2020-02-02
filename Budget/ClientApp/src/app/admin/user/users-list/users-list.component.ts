import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../shared/services/app/app.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.setTitle('Users');
    }
}
