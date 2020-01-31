import {Component, OnInit} from '@angular/core';
import {LoggedUser} from '../../shared/models/authentication/LoggedUser';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    loggedUser: LoggedUser = null;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.getLoggedUser();
    }

    private getLoggedUser(): void {
        this.authenticationService.getLoggedUserBehaviorSubject().subscribe((loggedUser: LoggedUser) => {
            this.loggedUser = loggedUser;
        });
    }

}
