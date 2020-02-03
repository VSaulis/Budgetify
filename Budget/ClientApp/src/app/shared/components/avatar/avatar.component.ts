import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user/User';
import {UsersListItem} from '../../models/user/UsersListItem';
import {RoleColors} from '../../enums/RoleColors';
import {Profile} from '../../models/profile/Profile';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

    @Input() user: User | UsersListItem | Profile;
    @Input() size = 35;
    color: string;
    initials: string;

    constructor() {
        console.log(this.size);
    }

    ngOnInit() {
        this.getColor();
        this.getInitials();
    }

    private getColor(): void {
        if (this.user.roles.find(role => role === 'Owner')) {
            this.color = RoleColors.owner;
        }

        if (this.user.roles.find(role => role === 'FamilyMember')) {
            this.color = RoleColors.familyMember;
        }

        if (this.user.roles.find(role => role === 'Guest')) {
            this.color = RoleColors.guest;
        }
    }

    private getInitials(): void {
        if (this.user.firstName && this.user.lastName) {
            this.initials = this.user.firstName.substring(0, 1) + this.user.lastName.substring(0, 1);
        } else {
            this.initials = this.user.email.substring(0, 2);
        }
    }
}
