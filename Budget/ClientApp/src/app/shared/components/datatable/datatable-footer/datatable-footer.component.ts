import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Paging} from '../../../contracts/Paging';

@Component({
    selector: 'app-datatable-footer',
    templateUrl: './datatable-footer.component.html',
    styleUrls: ['./datatable-footer.component.scss']
})
export class DatatableFooterComponent implements OnChanges {

    @Input() colspan: number;
    @Input() count: number;
    @Input() total: number;
    @Input() paging: Paging;
    @Output() pagingChange = new EventEmitter<Paging>();

    pagesCount = 0;
    currentPage = 1;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.paging) {
            this.paging = changes.paging.currentValue;
            this.currentPage = (this.paging.offset % this.paging.limit) + 1;
        }

        if (changes.count) {
            this.count = changes.count.currentValue;
            this.pagesCount = Math.ceil(this.count / this.paging.limit);
        }
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
        this.paging.offset = (page - 1) * this.paging.limit;
        this.pagingChange.emit(this.paging);
    }

}
