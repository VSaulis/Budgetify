import {Component, EventEmitter, OnInit} from '@angular/core';
import {UsersListItem} from '../../../shared/models/user/UsersListItem';
import {Paging} from '../../../shared/contracts/Paging';
import {BehaviorSubject, Observable} from 'rxjs';
import {Sort} from '../../../shared/contracts/Sort';
import {UserService} from '../../../shared/services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {UserFormModalComponent} from '../user-form-modal/user-form-modal.component';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../../shared/enums/ButtonClasses';
import {DatatableColumn} from '../../../shared/models/datatable/DatatableColumn';
import {DatatableAction} from '../../../shared/models/datatable/DatatableAction';
import {DatatableActionsTypes} from '../../../shared/enums/DatatableActionsTypes';
import {UsersFilter} from '../../../shared/contracts/user/UsersFilter';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';
import {AppService} from '../../../shared/services/app/app.service';
import {OperationsListItem} from '../../../shared/models/operation/OperationsListItem';
import {SortTypes} from '../../../shared/enums/SortTypes';
import {OperationService} from '../../../shared/services/operation/operation.service';
import {OperationFormModalComponent} from '../../operation/operation-form-modal/operation-form-modal.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    users: UsersListItem[] = [];
    usersCount = 0;

    paging = new BehaviorSubject<Paging>({
        limit: 20,
        offset: 0
    });

    sort = new BehaviorSubject<Sort>({
        type: SortTypes.desc,
        column: 'created'
    });

    constructor(private userService: UserService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.appService.setTitle('Users');
        this.getUsers();
    }

    openAddUserFormModal(): void {
        const modalRef = this.modalService.open(UserFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'User is successfully added', type: MessagesTypes.success});
                this.getUsers();
            }
        });
    }

    private getUsers(): void {
        this.userService.getUsers(null, this.sort.value, this.paging.value).subscribe((usersListResponse: ListResponse<UsersListItem>) => {
            this.users = usersListResponse.result;
            this.usersCount = usersListResponse.count;
        });
    }
}
