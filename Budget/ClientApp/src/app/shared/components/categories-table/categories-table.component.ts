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
import {CategoryDetailsModalComponent} from './category-details-modal/category-details-modal.component';
import {CategoriesFilterModalComponent} from './categories-filter-modal/categories-filter-modal.component';
import {CategoriesFilter} from '../../contracts/category/CategoriesFilter';
import {SortTypes} from '../../enums/SortTypes';

@Component({
    selector: 'app-categories-table',
    templateUrl: './categories-table.component.html',
    styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

    filter: CategoriesFilter = {};
    paging: Paging = {limit: 20, offset: 0};
    sort: Sort = {column: 'created', type: SortTypes.desc};

    categories: CategoriesListItem[] = [];
    selectedCategoriesIds: number[] = [];
    categoriesCount = 0;
    categoriesTotal = 0;
    colspan = 7;
    isLoading = true;
    columns: DatatableColumn[] = [
        {id: 'name', name: 'Name', sortable: true},
        {id: 'total', name: 'Total', sortable: true, class: 'center medium-column'},
        {id: 'user', name: 'Created by', sortable: true, class: 'user-column'},
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
                this.appService.setMessage({text: 'Category is successfully added', type: MessagesTypes.success});
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
                this.appService.setMessage({text: 'Category is successfully deleted', type: MessagesTypes.success});
                this.getCategories();
            }
        });
    }

    openEditCategoryFormModal(id: number): void {
        const modalRef = this.modalService.open(CategoryFormModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;

        modalRef.result.then((result) => {
            if (result) {
                this.appService.setMessage({text: 'Category is successfully updated', type: MessagesTypes.success});
                this.getCategories();
            }
        });
    }

    openFilterCategoriesModal(): void {
        const modalRef = this.modalService.open(CategoriesFilterModalComponent, {backdrop: false, windowClass: 'wide-modal'});
        modalRef.componentInstance.filter = this.filter;

        modalRef.result.then((result) => {
            if (result) {
                this.filterChange(result);
            }
        });
    }

    openCategoryDetailsModal(id: number): void {
        const modalRef = this.modalService.open(CategoryDetailsModalComponent, {backdrop: false});
        modalRef.componentInstance.id = id;
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
        this.paging = {...this.paging, offset: 0};
        this.getCategories();
    }

    pagingChange(paging: Paging): void {
        this.paging = paging;
        this.getCategories();
    }

    filterChange(filter: CategoriesFilter): void {
        this.filter = filter;
        this.paging = {...this.paging, offset: 0};
        this.getCategories();
    }

    private getCategories(): void {
        this.isLoading = true;
        this.categoryService.getCategories(this.filter, this.sort, this.paging).subscribe((categoriesListResponse: ListResponse<CategoriesListItem>) => {
            this.categories = categoriesListResponse.result;
            this.categoriesCount = categoriesListResponse.count;
            this.categoriesTotal = categoriesListResponse.total;
            this.isLoading = false;
        });
    }

}
