import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationRoutingModule} from './operation-routing.module';
import {OperationsListComponent} from './operations-list/operations-list.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        OperationsListComponent
    ],
    imports: [
        CommonModule,
        OperationRoutingModule,
        SharedModule
    ]
})
export class OperationModule {
}
