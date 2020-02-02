import {Component, OnInit} from '@angular/core';
import {Profile} from '../../shared/models/profile/Profile';
import {AppService} from '../../shared/services/app/app.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profile: Profile;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.getProfile().subscribe(profile => this.profile = profile);
    }

}
