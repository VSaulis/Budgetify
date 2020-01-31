import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Paging} from '../../../contracts/Paging';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-datatable-footer',
    templateUrl: './datatable-footer.component.html',
    styleUrls: ['./datatable-footer.component.scss']
})
export class DatatableFooterComponent implements OnChanges {

    @Input() colspan: number;
    @Input() count: number;

    @Output() paging = new BehaviorSubject<Paging>({
        limit: 20,
        offset: 0
    });

    pagesCount = 0;
    currentPage = 1;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.count = changes.count.currentValue;
        this.pagesCount = Math.ceil(this.count / this.paging.value.limit);
    }

    range(): number[] {
        const array: number[] = [];
        for (let i = Math.max(1, this.currentPage - 5); i <= Math.min(this.currentPage + 5, this.pagesCount); i++) {
            array.push(i);
        }
        return array;
    }

    setPage(page: number): void {
        this.currentPage = page;
        const paging = this.paging.value;
        paging.offset = (page - 1) * this.paging.value.limit;
        this.paging.next(paging);
    }

}
