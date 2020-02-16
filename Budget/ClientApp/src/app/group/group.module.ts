import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRoutingModule} from './group-routing.module';
import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupFormModalComponent} from './group-form-modal/group-form-modal.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {GroupComponent} from './group.component';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
    declarations: [
        GroupsListComponent,
        GroupFormModalComponent,
        HeaderComponent,
        GroupComponent
    ],
    imports: [
        CommonModule,
        GroupRoutingModule,
        SharedModule,
        ComponentsModule
    ],
    entryComponents: [
        GroupFormModalComponent
    ]
})
export class GroupModule {
}
