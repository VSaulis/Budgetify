import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationService} from '../../../services/operation/operation.service';
import {UserService} from '../../../services/user/user.service';
import {CategoryService} from '../../../services/category/category.service';
import {FormHelper} from '../../../utils/FormHelper';
import {CategoriesFilter} from '../../../contracts/category/CategoriesFilter';

@Component({
    selector: 'app-categories-filter-modal',
    templateUrl: './categories-filter-modal.component.html',
    styleUrls: ['./categories-filter-modal.component.scss']
})
export class CategoriesFilterModalComponent implements OnInit {

    @Input() filter: CategoriesFilter;
    form: FormGroup;

    constructor(public activeModal: NgbActiveModal,
                private operationService: OperationService,
                private userService: UserService,
                private categoryService: CategoryService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.setForm(this.filter);
    }

    apply() {
        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.activeModal.close(this.mapFilter());
        }
    }

    reset(): void {
        this.activeModal.close({deleted: false});
    }

    private mapFilter(): CategoriesFilter {
        return {
            totalFrom: this.form.value.totalFrom,
            totalTo: this.form.value.totalTo,
            deleted: this.form.value.deleted
        };
    }

    private setForm(filter: CategoriesFilter): void {
        this.form.get('totalFrom').setValue(filter.totalFrom ? filter.totalFrom : null);
        this.form.get('totalTo').setValue(filter.totalTo ? filter.totalTo : null);
        this.form.get('deleted').setValue(filter.deleted ? filter.deleted : false);
    }

    private createForm(): void {
        this.form = this.fb.group({
            totalFrom: [null],
            totalTo: [null],
            deleted: [false]
        });
    }

}
