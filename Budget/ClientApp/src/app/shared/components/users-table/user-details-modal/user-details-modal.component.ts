import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../models/user/User';
import {UserService} from '../../../services/user/user.service';

@Component({
    selector: 'app-user-details-modal',
    templateUrl: './user-details-modal.component.html',
    styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit {

    @Input() id: number;
    isLoading = true;
    user: User;

    constructor(public activeModal: NgbActiveModal,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getUser(this.id);
    }

    private getUser(id: number): void {
        this.userService.getUser(id).subscribe((user: User) => {
            this.user = user;
            this.isLoading = false;
        });
    }

}
