import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormHelper} from '../../../utils/FormHelper';
import {OperationService} from '../../../services/operation/operation.service';
import {Operation} from '../../../models/operation/Operation';
import {EditOperationRequest} from '../../../contracts/operation/EditOperationRequest';
import {AddOperationRequest} from '../../../contracts/operation/AddOperationRequest';
import {CategoriesListItem} from '../../../models/category/CategoriesListItem';
import {CategoryService} from '../../../services/category/category.service';
import {ListResponse} from '../../../contracts/ListResponse';

@Component({
    selector: 'app-operation-form-modal',
    templateUrl: './operation-form-modal.component.html',
    styleUrls: ['./operation-form-modal.component.scss']
})
export class OperationFormModalComponent implements OnInit {

    @Input() id: number;

    isLoading = true;
    operation: Operation;

    form: FormGroup;
    isSubmitting = false;
    categories: CategoriesListItem[] = [];

    constructor(public activeModal: NgbActiveModal,
                private operationService: OperationService,
                private categoryService: CategoryService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.getData();
    }

    save() {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            if (this.id) {
                this.operationService.editOperation(this.mapEditOperationRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            } else {
                this.operationService.addOperation(this.mapAddOperationRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            }
        }
    }

    private setForm(operation: Operation): void {
        this.form.get('categoryId').setValue(operation.category.id);
        this.form.get('date').setValue(operation.date);
        this.form.get('description').setValue(operation.description);
        this.form.get('amount').setValue(operation.amount);
    }

    private createForm(): void {
        this.form = this.fb.group({
            categoryId: [null, [Validators.required]],
            date: [null, [Validators.required]],
            description: [null, [Validators.required]],
            amount: [null, [Validators.required]]
        });
    }

    private mapAddOperationRequest(): AddOperationRequest {
        return {
            categoryId: this.form.value.categoryId,
            date: this.form.value.date,
            description: this.form.value.description,
            amount: this.form.value.amount
        };
    }

    private mapEditOperationRequest(): EditOperationRequest {
        return {
            id: this.id,
            version: this.operation.updated,
            categoryId: this.form.value.categoryId,
            date: this.form.value.date,
            description: this.form.value.description,
            amount: this.form.value.amount
        };
    }

    private getOperation(id: number): void {
        this.operationService.getOperation(id).subscribe((operation: Operation) => {
            this.operation = operation;
            this.setForm(operation);
            this.isLoading = false;
        });
    }

    private getData(): void {
        this.categoryService.getCategories({deleted: false}).subscribe((categoriesListResponse: ListResponse<CategoriesListItem>) => {
            this.categories = categoriesListResponse.result;
            this.id ? this.getOperation(this.id) : this.isLoading = false;
        });
    }

}
