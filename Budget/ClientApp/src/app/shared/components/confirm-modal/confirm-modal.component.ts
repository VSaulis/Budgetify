import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonClasses} from '../../enums/ButtonClasses';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

    @Input() heading: string;
    @Input() text: string;
    @Input() buttonClass: ButtonClasses;
    @Input() action: () => Observable<void>;
    isSubmitting = false;
    buttonClasses = ButtonClasses;

    constructor(public activeModal: NgbActiveModal) {
    }

    confirm(): void {
        if (this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;

        this.action().subscribe(() => {
            this.activeModal.close('confirmed');
            this.isSubmitting = false;
        }, (error) => this.isSubmitting = false);
    }


}
