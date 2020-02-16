import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() isLoading = false;
    @Input() type = 'button';
    @Input() icon: string;
    @Input() class = 'primary';
    @Input() label: string;
    @Input() disabled = false;

    constructor() {
    }

    ngOnInit() {
    }

}
