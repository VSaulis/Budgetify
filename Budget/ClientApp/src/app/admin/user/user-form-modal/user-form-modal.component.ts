import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormHelper} from '../../../shared/utils/FormHelper';
import {EditUserRequest} from '../../../shared/contracts/user/EditUserRequest';
import {AddUserRequest} from '../../../shared/contracts/user/AddUserRequest';
import {Roles} from '../../../shared/enums/Roles';

@Component({
    selector: 'app-user-form-modal',
    templateUrl: './user-form-modal.component.html',
    styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit {

    @Input() id: number;

    isLoading = true;
    user: User;

    form: FormGroup;
    isSubmitting = false;
    roles: Roles;

    constructor(public activeModal: NgbActiveModal,
                private userService: UserService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.id ? this.getUser(this.id) : this.isLoading = false;
    }

    save() {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            if (this.id) {
                this.userService.editUser(this.mapEditUserRequest()).subscribe((id: number) => {
                    this.activeModal.close(id);
                }, (err) => {
                    this.isSubmitting = false;
                });
            } else {
                this.userService.addUser(this.mapAddUserRequest()).subscribe((id: number) => {
                    this.activeModal.close(id);
                }, (err) => {
                    this.isSubmitting = false;
                });
            }
        }
    }

    private setForm(user: User): void {
        this.form.get('email').setValue(user.email);
        this.form.get('roles').setValue(user.roles);
    }

    private createForm(): void {
        this.form = this.fb.group({
            email: [null, [Validators.required]],
            roles: [null, [Validators.required]]
        });
    }

    private mapAddUserRequest(): AddUserRequest {
        return {
            email: this.form.value.email,
            roles: this.form.value.roles
        };
    }

    private mapEditUserRequest(): EditUserRequest {
        return {
            id: this.id,
            version: this.user.updated,
            email: this.form.value.email,
            roles: this.form.value.roles
        };
    }

    private getUser(id: number): void {
        this.userService.getUser(id).subscribe((user: User) => {
            this.user = user;
            this.setForm(user);
            this.isLoading = false;
        });
    }
}
