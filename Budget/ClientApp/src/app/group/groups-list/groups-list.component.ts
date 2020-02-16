import {Component, OnInit} from '@angular/core';
import {AppService} from '../../shared/services/app/app.service';
import {GroupService} from '../../shared/services/group/group.service';
import {GroupsListItem} from '../../shared/models/group/GroupsListItem';
import {ListResponse} from '../../shared/contracts/ListResponse';
import {Paging} from '../../shared/contracts/Paging';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesTypes} from '../../shared/enums/MessagesTypes';
import {GroupFormModalComponent} from '../group-form-modal/group-form-modal.component';
import {ConfirmModalComponent} from '../../shared/components/confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../shared/enums/ButtonClasses';
import {Router} from '@angular/router';

@Component({
    selector: 'app-groups-list',
    templateUrl: './groups-list.component.html',
    styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

    groups: GroupsListItem[] = [];
    isLoading = true;
    paging: Paging = {limit: 20, offset: 0};

    constructor(private appService: AppService,
                private router: Router,
                private groupService: GroupService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.appService.setTitle('Groups');
        this.getGroups();
    }

    openAddGroupFormModal(): void {
        const modalRef = this.modalService.open(GroupFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Group is successfully added', type: MessagesTypes.success});
                this.getGroups();
            }
        });
    }

    openDeleteGroupModal(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: false});
        modalRef.componentInstance.heading = 'Are you sure that you want to delete this group?';
        modalRef.componentInstance.buttonClass = ButtonClasses.danger;
        modalRef.componentInstance.action = () => this.groupService.deleteGroup(id);

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Group is successfully deleted', type: MessagesTypes.success});
                this.getGroups();
            }
        });
    }

    openEditGroupFormModal(id: number): void {
        const modalRef = this.modalService.open(GroupFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Group is successfully updated', type: MessagesTypes.success});
                this.getGroups();
            }
        });
    }

    selectGroup(group: GroupsListItem): void {
        this.appService.setGroup(group);
        this.router.navigateByUrl(`/groups/${group.id}`);
    }

    private getGroups(): void {
        this.groupService.getGroups(this.paging).subscribe((groupsListResponse: ListResponse<GroupsListItem>) => {
            this.groups = groupsListResponse.result;
        });
    }
}
