import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../shared/services/app/app.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.appService.setTitle('Categories');
    }
}
