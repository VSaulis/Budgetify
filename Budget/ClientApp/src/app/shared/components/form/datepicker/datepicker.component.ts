import {Component, forwardRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateFormatter} from '../../../utils/DateFormatter';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        }
    ]
})
export class DatepickerComponent implements ControlValueAccessor {

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

    @ViewChild('datepicker', {static: false}) datepicker;

    value: string;
    isFocused: boolean;
    isOpened = false;

    onChange = (value: string) => {};
    onBlur = (value: string) => {};

    registerOnChange(change: (value: string) => {}): void {
        this.onChange = change;
    }

    registerOnTouched(blur: (value: string) => {}): void {
        this.onBlur = blur;
    }

    writeValue(value: any): void {
        this.value = value ? DateFormatter.trimDate(value) : value;
    }

    dateSelect(bootstrapDateObject: any): void {
        const value = DateFormatter.toDateString(bootstrapDateObject);
        this.change(value);
    }

    toggleDatepicker(): void {
        if (this.isOpened) {
            this.datepicker.close();
            this.isFocused = false;
            this.isOpened = false;
        } else {
            this.datepicker.open();
            this.isFocused = true;
            this.isOpened = true;
        }
    }

    onDatepickerClose(): void {
        this.isOpened = false;
        this.isFocused = false;
    }

    setFocus(isFocused: boolean = true): void {
        this.isFocused = isFocused;
    }

    change(value: string): void {
        this.onChange(value);
        this.onBlur(value);
    }

    blur(value: string): void {
        this.isFocused = false;
        this.onBlur(value);
    }
}
