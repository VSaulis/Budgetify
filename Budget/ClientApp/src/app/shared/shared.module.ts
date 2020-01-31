import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt/jwt.interceptor';
import {NgxPermissionsModule} from 'ngx-permissions';
import {FormErrorDirective} from './directives/form-error/form-error.directive';
import {FormControlErrorDirective} from './directives/form-control-error/form-control-error.directive';
import {MessagesComponent} from './components/messages/messages.component';
import { LoaderComponent } from './components/loader/loader.component';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DatatableFooterComponent } from './components/datatable/datatable-footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/datatable/datatable-header/datatable-header.component';
import { LineLoaderComponent } from './components/line-loader/line-loader.component';

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
        NgbDropdownModule
    ],
    entryComponents: [
        ConfirmModalComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ]
})
export class SharedModule {
}
