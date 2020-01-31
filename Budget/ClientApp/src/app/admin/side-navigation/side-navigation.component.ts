import {Component} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent {

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
    }
}
