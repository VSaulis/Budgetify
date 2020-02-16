import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupComponent} from './group.component';

const routes: Routes = [
    {
        path: '',
        component: GroupComponent,
        children: [
            {
                path: '',
                component: GroupsListComponent
            },
            {
                path: ':id',
                loadChildren: './admin/admin.module#AdminModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule {
}
