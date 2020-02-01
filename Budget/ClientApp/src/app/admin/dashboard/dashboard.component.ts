import {Component, OnInit} from '@angular/core';
import {AppService} from '../../shared/services/app/app.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.setTitle('Dashboard');
    }

}
