import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input() initials: string;
    @Input() size = 35;
    @Input() color: string;

    ngOnInit(): void {
        this.initials = this.initials.substr(0, 2);
    }

}
