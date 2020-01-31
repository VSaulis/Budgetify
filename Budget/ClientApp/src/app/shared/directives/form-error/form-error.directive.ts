import {Directive, HostBinding, Input} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import * as _ from 'lodash';

@Directive({
    selector: '[appFormError]'
})
export class FormErrorDirective {

    @Input('appFormError') abstractControl: AbstractControl;
    @Input() errorType: string;

    @HostBinding('class.has-error')
    get isInvalid() {
        return this.abstractControl &&
            this.abstractControl.touched &&
            this.abstractControl.errors &&
            _.get(this.abstractControl.errors, this.errorType);
    }

}
