import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'admin'},
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            },
            {
                path: '',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
