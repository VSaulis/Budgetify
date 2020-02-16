import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../shared/services/app/app.service';
import {Profile} from '../../../shared/models/profile/Profile';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

    profile: Profile;

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.getProfile();
    }

    private getProfile(): void {
        this.appService.getProfile().subscribe(profile => this.profile = profile);
    }
}
