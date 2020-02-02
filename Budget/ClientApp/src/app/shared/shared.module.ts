import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt/jwt.interceptor';
import {NgxPermissionsModule} from 'ngx-permissions';
import {FormErrorDirective} from './directives/form-error/form-error.directive';
import {FormControlErrorDirective} from './directives/form-control-error/form-control-error.directive';
import {MessagesComponent} from './components/messages/messages.component';
import {LoaderComponent} from './components/loader/loader.component';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {DatatableComponent} from './components/datatable/datatable.component';
import {DatatableFooterComponent} from './components/datatable/datatable-footer/datatable-footer.component';
import {DatatableHeaderComponent} from './components/datatable/datatable-header/datatable-header.component';
import {LineLoaderComponent} from './components/line-loader/line-loader.component';
import {MoneyPipe} from './pipes/money/money.pipe';
import {DatePipe} from './pipes/date/date.pipe';
import {CategoriesTableComponent} from './components/categories-table/categories-table.component';
import {OperationsTableComponent} from './components/operations-table/operations-table.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UserFormModalComponent} from './components/users-table/user-form-modal/user-form-modal.component';
import {CategoryFormModalComponent} from './components/categories-table/category-form-modal/category-form-modal.component';
import {OperationFormModalComponent} from './components/operations-table/operation-form-modal/operation-form-modal.component';

@NgModule({
    declarations: [
        FormErrorDirective,
        FormControlErrorDirective,
        MessagesComponent,
        LoaderComponent,
        ConfirmModalComponent,
        DatatableComponent,
        DatatableFooterComponent,
        DatatableHeaderComponent,
        LineLoaderComponent,
        MoneyPipe,
        DatePipe,
        CategoriesTableComponent,
        OperationsTableComponent,
        UsersTableComponent,
        UserFormModalComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        NgbModalModule,
        NgSelectModule,
        NgbDropdownModule
    ],
    exports: [
        ReactiveFormsModule,
        NgxPermissionsModule,
        FormErrorDirective,
        FormControlErrorDirective,
        MessagesComponent,
        LoaderComponent,
        NgbModalModule,
        NgSelectModule,
        ConfirmModalComponent,
        DatatableComponent,
        NgbDropdownModule,
        MoneyPipe,
        DatePipe,
        DatatableFooterComponent,
        LineLoaderComponent,
        DatatableHeaderComponent,
        CategoriesTableComponent,
        OperationsTableComponent,
        UsersTableComponent,
        UserFormModalComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent
    ],
    entryComponents: [
        ConfirmModalComponent,
        UserFormModalComponent,
        CategoryFormModalComponent,
        OperationFormModalComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ]
})
export class SharedModule {
}
