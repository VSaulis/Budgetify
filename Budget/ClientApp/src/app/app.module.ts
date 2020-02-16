import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgxPermissionsModule.forRoot(),
        ComponentsModule
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
