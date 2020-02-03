import {Component, OnInit} from '@angular/core';
import {CategoriesListItem} from '../../models/category/CategoriesListItem';
import {Paging} from '../../contracts/Paging';
import {Sort} from '../../contracts/Sort';
import {DatatableColumn} from '../../models/datatable/DatatableColumn';
import {CategoryService} from '../../services/category/category.service';
import {AppService} from '../../services/app/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryFormModalComponent} from './category-form-modal/category-form-modal.component';
import {MessagesTypes} from '../../enums/MessagesTypes';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ButtonClasses} from '../../enums/ButtonClasses';
import {ListResponse} from '../../contracts/ListResponse';
import {OperationFormModalComponent} from '../operations-table/operation-form-modal/operation-form-modal.component';

@Component({
    selector: 'app-categories-table',
    templateUrl: './categories-table.component.html',
    styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

    categories: CategoriesListItem[] = [];
    selectedCategoriesIds: number[] = [];
    categoriesCount = 0;
    colspan = 7;
    paging: Paging;
    sort: Sort;
    isLoading = true;
    columns: DatatableColumn[] = [
        {id: 'name', name: 'Name', sortable: true},
        {id: 'total', name: 'Total', sortable: true, class: 'center medium-column'},
        {id: 'user.email', name: 'Created by', sortable: true, class: 'user-column'},
        {id: 'updated', name: 'Updated', sortable: true, class: 'center medium-column'},
        {id: 'created', name: 'Created', sortable: true, class: 'center medium-column'}
    ];

    constructor(private categoryService: CategoryService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getCategories();
    }

    openAddCategoryFormModal(): void {
        const modalRef = this.modalService.open(CategoryFormModalComponent, {backdrop: false});

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'Category is successfully added', type: MessagesTypes.success});
                this.getCategories();
            }
        });
    }

    openDeleteCategoryFormModal(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: false});
        modalRef.componentInstance.heading = 'Are you sure that you want to delete this category?';
        modalRef.componentInstance.buttonClass = ButtonClasses.danger;
        modalRef.componentInstance.action = () => this.categoryService.deleteCategory(id);

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'Category is successfully deleted', type: MessagesTypes.success});
                this.getCategories();
            }
        });
    }

    openEditCategoryFormModal(id: number): void {
        const modalRef = this.modalService.open(CategoryFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.addMessage({text: 'Category is successfully updated', type: MessagesTypes.success});
                this.getCategories();
            }
        });
    }

    selectAll(checked: boolean): void {
        if (checked) {
            this.selectedCategoriesIds = this.categories.map((category: CategoriesListItem) => category.id);
        } else {
            this.selectedCategoriesIds = [];
        }
    }

    handleCategorySelect($event) {
        const checkbox = $event.target;

        if (checkbox.checked) {
            this.selectedCategoriesIds.push(Number(checkbox.value));
        } else {
            this.selectedCategoriesIds = this.selectedCategoriesIds.filter((categoryId: number) => categoryId !== Number(checkbox.value));
        }
    }

    sortChange(sort: Sort): void {
        this.sort = sort;
        this.getCategories();
    }

    pagingChange(paging: Paging): void {
        this.paging = paging;
        this.getCategories();
    }

    private getCategories(): void {
        this.isLoading = true;
        this.categoryService.getCategories(null, this.sort, this.paging).subscribe((categoriesListResponse: ListResponse<CategoriesListItem>) => {
            this.categories = categoriesListResponse.result;
            this.categoriesCount = categoriesListResponse.count;
            this.isLoading = false;
        });
    }

}
