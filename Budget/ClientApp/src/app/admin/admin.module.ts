import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../shared/shared.module';
import {SideNavigationComponent} from './side-navigation/side-navigation.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AdminComponent,
        SideNavigationComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule {
}
