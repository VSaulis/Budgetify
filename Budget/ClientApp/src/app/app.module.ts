import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PermissionService} from './shared/services/permission/permission.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgxPermissionsModule.forRoot()
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (authenticationService: AuthenticationService) => () => {
                const loggedUser = authenticationService.getUser();
                if (loggedUser) {
                    authenticationService.getLoggedUser().subscribe();
                }
            },
            deps: [AuthenticationService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
