import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormModalComponent } from './category-form-modal/category-form-modal.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        CategoriesListComponent,
        CategoryFormModalComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule
    ],
    entryComponents: [
        CategoryFormModalComponent
    ]
})
export class CategoryModule {
}
