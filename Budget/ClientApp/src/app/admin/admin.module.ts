import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SideNavigationComponent} from './side-navigation/side-navigation.component';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
    declarations: [
        SideNavigationComponent,
        AdminComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ComponentsModule
    ]
})
export class AdminModule {
}
