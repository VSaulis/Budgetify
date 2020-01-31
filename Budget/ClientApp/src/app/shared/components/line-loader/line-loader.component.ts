import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-line-loader',
    templateUrl: './line-loader.component.html',
    styleUrls: ['./line-loader.component.scss']
})
export class LineLoaderComponent implements OnInit {

    @Input() isPositionAbsolute = false;

    constructor() {
    }

    ngOnInit() {
    }

}
