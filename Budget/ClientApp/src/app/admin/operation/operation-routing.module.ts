import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoriesListComponent} from '../category/categories-list/categories-list.component';
import {OperationsListComponent} from './operations-list/operations-list.component';


const routes: Routes = [
    {
        path: '',
        component: OperationsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationRoutingModule {
}
