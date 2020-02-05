import {Directive, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
    selector: '[appFormControl]'
})
export class FormControlDirective {

    @Input('appFormControl') abstractControl: AbstractControl;

    @HostBinding('class.has-value')
    get hasValue() {
        return this.abstractControl &&
            this.abstractControl.value;
    }
}
