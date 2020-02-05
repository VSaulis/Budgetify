import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user/User';
import {UsersListItem} from '../../models/user/UsersListItem';
import {Profile} from '../../models/profile/Profile';

@Component({
    selector: 'app-user-box',
    templateUrl: './user-box.component.html',
    styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent implements OnInit {

    @Input() user: User | UsersListItem | Profile;
    fullName: string;

    constructor() {
    }

    ngOnInit() {
        this.getFullName();
    }

    private getFullName(): void {
        if (this.user.firstName && this.user.lastName) {
            this.fullName = `${this.user.firstName} ${this.user.lastName}`;
        } else {
            this.fullName = this.user.email;
        }
    }
}
