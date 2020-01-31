import {Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
    selector: '[appFormControlError]'
})
export class FormControlErrorDirective {

    @Input('appFormControlError') abstractControl: AbstractControl;

    @HostBinding('class.is-invalid')
    get isInvalid() {
        return this.abstractControl &&
            this.abstractControl.touched &&
            this.abstractControl.errors;
    }
}
