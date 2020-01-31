import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UserFormModalComponent} from './users-list/user-form-modal/user-form-modal.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        UsersListComponent,
        UserFormModalComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ],
    entryComponents: [
        UserFormModalComponent
    ]
})
export class UserModule {
}
