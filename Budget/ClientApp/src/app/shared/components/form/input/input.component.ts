import {Component, forwardRef, HostBinding, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {

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
    @Input() type: string;

    isFocused: boolean;
    value: string;

    onChange = (value: any) => {
    };
    onBlur = (value: any) => {
    };

    registerOnChange(change: (value: any) => {}): void {
        this.onChange = change;
    }

    registerOnTouched(blur: (value: any) => {}): void {
        this.onBlur = blur;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    setFocus(isFocused: boolean = true): void {
        this.isFocused = isFocused;
    }

    blur(value: any) {
        value = value && this.type === 'number' ? Number(value) : value;
        this.isFocused = false;
        this.onBlur(value);
    }

    change(value: any): void {
        value = value && this.type === 'number' ? Number(value) : value;
        this.onBlur(value);
        this.onChange(value);
    }
}
