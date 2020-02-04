import {Component, OnInit} from '@angular/core';
import {UsersListItem} from '../../models/user/UsersListItem';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {DatatableColumn} from '../../models/datatable/DatatableColumn';
import {UserService} from '../../services/user/user.service';
import {AppService} from '../../services/app/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormModalComponent} from './user-form-modal/user-form-modal.component';
import {MessagesTypes} from '../../enums/MessagesTypes';
import {ListResponse} from '../../contracts/ListResponse';
import {OperationFormModalComponent} from '../operations-table/operation-form-modal/operation-form-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../enums/ButtonClasses';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

    users: UsersListItem[] = [];
    usersCount = 0;
    colspan = 9;
    paging: Paging;
    sort: Sort;
    isLoading = true;
    selectedUsersIds: number[] = [];
    columns: DatatableColumn[] = [
        {id: 'avatar', name: 'Avatar', class: 'center small-column'},
        {id: 'email', name: 'Email', sortable: true},
        {id: 'firstName', name: 'First name', sortable: true},
        {id: 'lastName', name: 'Last name', sortable: true},
        {id: 'roles', name: 'Roles'},
        {id: 'updated', name: 'Updated', sortable: true, class: 'center medium-column'},
        {id: 'created', name: 'Created', sortable: true, class: 'center medium-column'}
    ];

    constructor(private userService: UserService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getUsers();
    }

    openAddUserFormModal(): void {
        const modalRef = this.modalService.open(UserFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'User is successfully added', type: MessagesTypes.success});
                this.getUsers();
            }
        });
    }

    openEditUserFormModal(id: number): void {
        const modalRef = this.modalService.open(UserFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'User is successfully updated', type: MessagesTypes.success});
                this.getUsers();
            }
        });
    }

    openDeleteUserFormModal(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: false});
        modalRef.componentInstance.heading = 'Are you sure that you want to delete this user?';
        modalRef.componentInstance.buttonClass = ButtonClasses.danger;
        modalRef.componentInstance.action = () => this.userService.deleteUser(id);

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'User is successfully deleted', type: MessagesTypes.success});
                this.getUsers();
            }
        });
    }

    pagingChange(paging: Paging): void {
        this.paging = paging;
        this.getUsers();
    }

    sortChange(sort: Sort): void {
        this.sort = sort;
        this.getUsers();
    }

    selectAll(checked: boolean): void {
        if (checked) {
            this.selectedUsersIds = this.users.map((user: UsersListItem) => user.id);
        } else {
            this.selectedUsersIds = [];
        }
    }

    handleUserSelect($event) {
        const checkbox = $event.target;

        if (checkbox.checked) {
            this.selectedUsersIds.push(Number(checkbox.value));
        } else {
            this.selectedUsersIds = this.selectedUsersIds.filter((userId: number) => userId !== Number(checkbox.value));
        }
    }

    private getUsers(): void {
        this.isLoading = true;
        this.userService.getUsers(null, this.sort, this.paging).subscribe((usersListResponse: ListResponse<UsersListItem>) => {
            this.users = usersListResponse.result;
            this.usersCount = usersListResponse.count;
            this.isLoading = false;
        });
    }

}
