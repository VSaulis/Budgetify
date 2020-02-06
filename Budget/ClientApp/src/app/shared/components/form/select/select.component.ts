import {Component, forwardRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {

    @HostBinding('class.has-value')
    get hasValue() {
        return this.abstractControl.value;
    }

    @HostBinding('class.has-focus')
    get hasFocus() {
        return this.isFocused;
    }

    @Input() abstractControl: AbstractControl;
    @Input() formControlName: string;
    @Input() label: string;
    @Input() multiple: boolean;
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() items: any[] = [];

    value: any;
    isFocused: boolean;

    onChange = (value: any) => {};
    onBlur = (value: any) => {};

    registerOnChange(change: (value: any) => {}): void {
        this.onChange = change;
    }

    registerOnTouched(blur: (value: any) => {}): void {
        this.onBlur = blur;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    change(value: any): void {
        this.onBlur(value);
        this.onChange(value);
    }

    blur(value: any): void {
        this.isFocused = false;
        this.onBlur(value);
    }

    setFocus(isFocused: boolean = true): void {
        this.isFocused = isFocused;
    }

}
