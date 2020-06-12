import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt/jwt.interceptor';
import {NgxPermissionsModule} from 'ngx-permissions';
import {MessagesComponent} from './components/messages/messages.component';
import {LoaderComponent} from './components/loader/loader.component';
import {NgbDatepickerModule, NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {DatatableFooterComponent} from './components/datatable/datatable-footer/datatable-footer.component';
import {DatatableHeaderComponent} from './components/datatable/datatable-header/datatable-header.component';
import {LineLoaderComponent} from './components/line-loader/line-loader.component';
import {MoneyPipe} from './pipes/money/money.pipe';
import {DatePipe} from './pipes/date/date.pipe';
import {CategoriesTableComponent} from './components/categories-table/categories-table.component';
import {OperationsTableComponent} from './components/operations-table/operations-table.component';
import {CategoryFormModalComponent} from './components/categories-table/category-form-modal/category-form-modal.component';
import {OperationFormModalComponent} from './components/operations-table/operation-form-modal/operation-form-modal.component';
import {CategoryDetailsModalComponent} from './components/categories-table/category-details-modal/category-details-modal.component';
import {OperationDetailsModalComponent} from './components/operations-table/operation-details-modal/operation-details-modal.component';
import {FormControlDirective} from './directives/form-control/form-control.directive';
import {FormErrorDirective} from './directives/form-error/form-error.directive';
import {CategoriesFilterModalComponent} from './components/categories-table/categories-filter-modal/categories-filter-modal.component';
import {OperationsFilterModalComponent} from './components/operations-table/operations-filter-modal/operations-filter-modal.component';
import {DatepickerComponent} from './components/form/datepicker/datepicker.component';
import {InputComponent} from './components/form/input/input.component';
import {SelectComponent} from './components/form/select/select.component';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    declarations: [
        MessagesComponent,
        LoaderComponent,
        ConfirmModalComponent,
        DatatableFooterComponent,
        DatatableHeaderComponent,
        LineLoaderComponent,
        MoneyPipe,
        DatePipe,
        CategoriesTableComponent,
        OperationsTableComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent,
        CategoryDetailsModalComponent,
        OperationDetailsModalComponent,
        FormControlDirective,
        FormErrorDirective,
        CategoriesFilterModalComponent,
        OperationsFilterModalComponent,
        DatepickerComponent,
        InputComponent,
        SelectComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        NgbModalModule,
        NgSelectModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        FormsModule,
        ComponentsModule
    ],
    exports: [
        ReactiveFormsModule,
        NgxPermissionsModule,
        FormControlDirective,
        MessagesComponent,
        LoaderComponent,
        NgbModalModule,
        NgSelectModule,
        ConfirmModalComponent,
        NgbDropdownModule,
        MoneyPipe,
        DatePipe,
        DatatableFooterComponent,
        LineLoaderComponent,
        DatatableHeaderComponent,
        CategoriesTableComponent,
        OperationsTableComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent,
        FormErrorDirective,
        DatepickerComponent,
        InputComponent,
        SelectComponent,
    ],
    entryComponents: [
        ConfirmModalComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent,
        CategoryDetailsModalComponent,
        OperationDetailsModalComponent,
        OperationsFilterModalComponent,
        CategoriesFilterModalComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ]
})
export class SharedModule {
}
