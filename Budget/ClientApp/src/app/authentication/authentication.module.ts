import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {SharedModule} from '../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        SharedModule
    ]
})
export class AuthenticationModule {
}
