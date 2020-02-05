import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/category/Category';

@Component({
    selector: 'app-category-details-modal',
    templateUrl: './category-details-modal.component.html',
    styleUrls: ['./category-details-modal.component.scss']
})
export class CategoryDetailsModalComponent implements OnInit {

    @Input() id: number;
    isLoading = true;
    category: Category;

    constructor(public activeModal: NgbActiveModal,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.getCategory(this.id);
    }

    private getCategory(id: number): void {
        this.categoryService.getCategory(id).subscribe((category: Category) => {
            this.category = category;
            this.isLoading = false;
        });
    }
}
