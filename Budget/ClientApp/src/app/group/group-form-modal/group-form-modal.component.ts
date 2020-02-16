import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group/Group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormHelper} from '../../shared/utils/FormHelper';
import {GroupService} from '../../shared/services/group/group.service';
import {EditGroupRequest} from '../../shared/contracts/group/EditGroupRequest';
import {AddGroupRequest} from '../../shared/contracts/group/AddGroupRequest';

@Component({
    selector: 'app-group-form-modal',
    templateUrl: './group-form-modal.component.html',
    styleUrls: ['./group-form-modal.component.scss']
})
export class GroupFormModalComponent implements OnInit {

    @Input() id: number;
    isLoading = true;
    group: Group;
    form: FormGroup;
    isSubmitting = false;

    constructor(public activeModal: NgbActiveModal, private groupService: GroupService, private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.id ? this.getGroup(this.id) : this.isLoading = false;
    }

    save() {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            if (this.id) {
                this.groupService.editGroup(this.mapEditGroupRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            } else {
                this.groupService.addGroup(this.mapAddGroupRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            }
        }
    }

    private setForm(group: Group): void {
        this.form.get('name').setValue(group.name);
        FormHelper.markFormAsTouched(this.form);
    }

    private createForm(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required]]
        });
    }

    private mapAddGroupRequest(): AddGroupRequest {
        return {
            name: this.form.value.name
        };
    }

    private mapEditGroupRequest(): EditGroupRequest {
        return {
            id: this.id,
            version: this.group.updated,
            name: this.form.value.name
        };
    }

    private getGroup(id: number): void {
        this.groupService.getGroup(id).subscribe((group: Group) => {
            this.group = group;
            this.setForm(group);
            this.isLoading = false;
        });
    }

}
