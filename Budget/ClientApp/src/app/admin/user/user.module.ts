import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule {
}
