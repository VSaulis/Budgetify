import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SideNavigationComponent} from './side-navigation/side-navigation.component';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        SideNavigationComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule {
}
