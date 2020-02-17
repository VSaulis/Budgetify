import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {AppService} from '../../shared/services/app/app.service';
import {Profile} from '../../shared/models/profile/Profile';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    profile: Profile;
    title: string;

    constructor(private appService: AppService,
                private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
        });

        this.getProfile();
        this.getTitle();
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
    }

    private getTitle(): void {
        this.appService.getTitle().subscribe((title: string) => {
            this.title = title;
        });
    }

    private getProfile(): void {
        this.appService.getProfile().subscribe((profile: Profile) => {
            this.profile = profile;
        });
    }

}
