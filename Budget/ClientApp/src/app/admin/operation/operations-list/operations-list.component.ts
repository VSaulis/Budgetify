import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../shared/services/app/app.service';

@Component({
    selector: 'app-operations-list',
    templateUrl: './operations-list.component.html',
    styleUrls: ['./operations-list.component.scss']
})
export class OperationsListComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.setTitle('Operations');
    }

}
