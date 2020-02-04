import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Roles} from '../../../enums/Roles';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormHelper} from '../../../utils/FormHelper';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/category/Category';
import {EditCategoryRequest} from '../../../contracts/category/EditCategoryRequest';
import {AddCategoryRequest} from '../../../contracts/category/AddCategoryRequest';

@Component({
    selector: 'app-category-form-modal',
    templateUrl: './category-form-modal.component.html',
    styleUrls: ['./category-form-modal.component.scss']
})
export class CategoryFormModalComponent implements OnInit {

    @Input() id: number;

    isLoading = true;
    category: Category;

    form: FormGroup;
    isSubmitting = false;
    roles: Roles;

    constructor(public activeModal: NgbActiveModal,
                private categoryService: CategoryService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.id ? this.getCategory(this.id) : this.isLoading = false;
    }

    save() {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            if (this.id) {
                this.categoryService.editCategory(this.mapEditCategoryRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            } else {
                this.categoryService.addCategory(this.mapAddCategoryRequest()).subscribe(() => {
                    this.activeModal.close('success');
                }, (err) => {
                    this.isSubmitting = false;
                });
            }
        }
    }

    private setForm(category: Category): void {
        this.form.get('name').setValue(category.name);
        FormHelper.markFormAsTouched(this.form);
    }

    private createForm(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required]]
        });
    }

    private mapAddCategoryRequest(): AddCategoryRequest {
        return {
            name: this.form.value.name
        };
    }

    private mapEditCategoryRequest(): EditCategoryRequest {
        return {
            id: this.id,
            version: this.category.updated,
            name: this.form.value.name
        };
    }

    private getCategory(id: number): void {
        this.categoryService.getCategory(id).subscribe((category: Category) => {
            this.category = category;
            this.setForm(category);
            this.isLoading = false;
        });
    }

}
