import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriesListItem} from '../../../models/category/CategoriesListItem';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationService} from '../../../services/operation/operation.service';
import {CategoryService} from '../../../services/category/category.service';
import {FormHelper} from '../../../utils/FormHelper';
import {OperationsFilter} from '../../../contracts/operation/OperationsFilter';
import {ListResponse} from '../../../contracts/ListResponse';

@Component({
    selector: 'app-operations-filter-modal',
    templateUrl: './operations-filter-modal.component.html',
    styleUrls: ['./operations-filter-modal.component.scss']
})
export class OperationsFilterModalComponent implements OnInit {

    @Input() filter: OperationsFilter;

    isLoading = true;
    categories: CategoriesListItem[] = [];

    form: FormGroup;

    constructor(public activeModal: NgbActiveModal,
                private operationService: OperationService,
                private categoryService: CategoryService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.getData();
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

    private mapFilter(): OperationsFilter {
        return {
            dateFrom: this.form.value.dateFrom,
            dateTo: this.form.value.dateTo,
            amountFrom: this.form.value.amountFrom,
            amountTo: this.form.value.amountTo,
            categoriesIds: this.form.value.categoriesIds,
            usersIds: this.form.value.usersIds
        };
    }

    private setForm(filter: OperationsFilter): void {
        this.form.get('dateFrom').setValue(filter.dateFrom ? filter.dateFrom : null);
        this.form.get('dateTo').setValue(filter.dateTo ? filter.dateTo : null);
        this.form.get('amountFrom').setValue(filter.amountFrom ? filter.amountFrom : null);
        this.form.get('amountTo').setValue(filter.amountTo ? filter.amountTo : null);
        this.form.get('categoriesIds').setValue(filter.categoriesIds ? filter.categoriesIds : null);
    }

    private createForm(): void {
        this.form = this.fb.group({
            dateFrom: [null],
            dateTo: [null],
            amountFrom: [null],
            amountTo: [null],
            categoriesIds: [null]
        });
    }

    private getData(): void {
        this.categoryService.getCategories().subscribe((categoriesListResponse: ListResponse<CategoriesListItem>) => {
            this.categories = categoriesListResponse.result;
            this.isLoading = false;
        });
    }

}
