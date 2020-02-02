import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'users'},
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'users',
                loadChildren: './user/user.module#UserModule',
            },
            {
                path: 'categories',
                loadChildren: './category/category.module#CategoryModule',
            },
            {
                path: 'operations',
                loadChildren: './operation/operation.module#OperationModule',
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
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
