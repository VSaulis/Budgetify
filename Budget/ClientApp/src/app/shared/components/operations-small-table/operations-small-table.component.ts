import {Component, Input, OnInit} from '@angular/core';
import {OperationsListItem} from '../../models/operation/OperationsListItem';

@Component({
    selector: 'app-operations-small-table',
    templateUrl: './operations-small-table.component.html',
    styleUrls: ['./operations-small-table.component.scss']
})
export class OperationsSmallTableComponent implements OnInit {

    @Input() class: string;
    @Input() title: string;
    @Input() operations: OperationsListItem[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}
