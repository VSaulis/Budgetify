import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationRoutingModule} from './operation-routing.module';
import {OperationsListComponent} from './operations-list/operations-list.component';
import {OperationFormModalComponent} from './operation-form-modal/operation-form-modal.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        OperationsListComponent,
        OperationFormModalComponent
    ],
    imports: [
        CommonModule,
        OperationRoutingModule,
        SharedModule
    ],
    entryComponents: [
        OperationFormModalComponent
    ]
})
export class OperationModule {
}
