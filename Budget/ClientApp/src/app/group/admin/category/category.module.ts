import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
    declarations: [
        CategoriesListComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule
    ]
})
export class CategoryModule {
}
