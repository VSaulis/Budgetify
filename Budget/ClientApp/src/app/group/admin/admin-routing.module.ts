import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            {
                path: 'categories',
                loadChildren: './category/category.module#CategoryModule'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'users',
                loadChildren: './user/user.module#UserModule'
            },
            {
                path: 'operations',
                loadChildren: './operation/operation.module#OperationModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
