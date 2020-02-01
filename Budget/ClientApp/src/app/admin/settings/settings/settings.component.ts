import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../shared/services/app/app.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.setTitle('Settings');
    }

}
