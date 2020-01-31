import {Component, EventEmitter, OnInit} from '@angular/core';
import {UsersListItem} from '../../../shared/models/user/UsersListItem';
import {Paging} from '../../../shared/contracts/Paging';
import {Observable} from 'rxjs';
import {Sort} from '../../../shared/contracts/Sort';
import {UserService} from '../../../shared/services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {UserFormModalComponent} from './user-form-modal/user-form-modal.component';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../../shared/enums/ButtonClasses';
import {DatatableColumn} from '../../../shared/models/datatable/DatatableColumn';
import {DatatableAction} from '../../../shared/models/datatable/DatatableAction';
import {DatatableActionsTypes} from '../../../shared/enums/DatatableActionsTypes';
import {UsersFilter} from '../../../shared/contracts/user/UsersFilter';
import {MessageService} from '../../../shared/services/message/message.service';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    columns: DatatableColumn[];
    filter: UsersFilter;
    getUsersFunction: (filter: UsersFilter, sort: Sort, paging: Paging) => Observable<ListResponse<UsersListItem>>;
    datatableRefresh = new EventEmitter<void>();

    constructor(private userService: UserService,
                private messageService: MessageService,
                private modalService: NgbModal) {
        this.columns = [
            {id: 'email', name: 'Email', sortable: true},
            {id: 'roles', name: 'Roles'}
        ];
    }

    ngOnInit(): void {
        this.getUsersFunction = (filter: UsersFilter, sort: Sort, paging: Paging) => this.getUsers(filter, sort, paging);
    }

    handleAction(action: DatatableAction): void {
        switch (action.type) {
            case DatatableActionsTypes.Add:
                this.openAddUserFormModal();
                break;
            case DatatableActionsTypes.Delete:
                this.openDeleteUserModal(action.id);
                break;
            case DatatableActionsTypes.Edit:
                this.openEditUserFormModal(action.id);
                break;
            case DatatableActionsTypes.View:
                break;
        }
    }

    openAddUserFormModal(): void {
        const modalRef = this.modalService.open(UserFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.messageService.addMessage({text: 'User is successfully added', type: MessagesTypes.success});
                this.datatableRefresh.emit();
            }
        });
    }

    openEditUserFormModal(id: number): void {
        const modalRef = this.modalService.open(UserFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.messageService.addMessage({text: 'User is successfully updated', type: MessagesTypes.success});
                this.datatableRefresh.emit();
            }
        });
    }

    openDeleteUserModal(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: false});
        modalRef.componentInstance.heading = 'Are you sure that you want to delete this user?';
        modalRef.componentInstance.buttonClass = ButtonClasses.danger;
        modalRef.componentInstance.action = () => this.userService.deleteUser(id);

        modalRef.result.then((result) => {
            if (result) {
                this.messageService.addMessage({text: 'User is successfully deleted', type: MessagesTypes.success});
                this.datatableRefresh.emit();
            }
        });
    }

    private getUsers(filter: UsersFilter, sort: Sort, paging: Paging) {
        return this.userService.getUsers(filter, sort, paging);
    }
}
