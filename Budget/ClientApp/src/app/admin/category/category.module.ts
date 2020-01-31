import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';


@NgModule({
    declarations: [
        CategoriesListComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule
    ]
})
export class CategoryModule {
}
