import {Component, OnInit} from '@angular/core';
import {UsersListItem} from '../../../shared/models/user/UsersListItem';
import {Paging} from '../../../shared/contracts/Paging';
import {Sort} from '../../../shared/contracts/Sort';
import {UserService} from '../../../shared/services/user/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {UserFormModalComponent} from '../user-form-modal/user-form-modal.component';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';
import {AppService} from '../../../shared/services/app/app.service';
import {CategoriesListItem} from '../../../shared/models/category/CategoriesListItem';
import {DatatableColumn} from '../../../shared/models/datatable/DatatableColumn';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

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
