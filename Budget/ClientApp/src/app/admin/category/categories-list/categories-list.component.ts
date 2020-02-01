import {Component, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../../shared/services/category/category.service';
import {CategoriesListItem} from '../../../shared/models/category/CategoriesListItem';
import {ListResponse} from '../../../shared/contracts/ListResponse';
import {BehaviorSubject} from 'rxjs';
import {Paging} from '../../../shared/contracts/Paging';
import {Sort} from '../../../shared/contracts/Sort';
import {SortTypes} from '../../../shared/enums/SortTypes';
import {MessagesTypes} from '../../../shared/enums/MessagesTypes';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryFormModalComponent} from '../category-form-modal/category-form-modal.component';
import {AppService} from '../../../shared/services/app/app.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

    categories: CategoriesListItem[] = [];
    categoriesCount = 0;

    paging = new BehaviorSubject<Paging>({
        limit: 20,
        offset: 0
    });

    sort = new BehaviorSubject<Sort>({
        type: SortTypes.desc,
        column: 'created'
    });

    constructor(private categoryService: CategoryService,
                private appService: AppService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.appService.setTitle('Categories');
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

    private getCategories(): void {
        this.categoryService.getCategories(null, this.sort.value, this.paging.value).subscribe((categoriesListResponse: ListResponse<CategoriesListItem>) => {
            this.categories = categoriesListResponse.result;
            this.categoriesCount = categoriesListResponse.count;
        });
    }
}
