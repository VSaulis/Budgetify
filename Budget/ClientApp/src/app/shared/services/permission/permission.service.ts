import {Injectable} from '@angular/core';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(private permissionsService: NgxPermissionsService) {
    }

    loadPermissions(permissions: string[]): void {
        this.permissionsService.loadPermissions(permissions);
    }

    flushPermissions(): void {
        this.permissionsService.flushPermissions();
    }
}
