import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {

    transform(value: string, isDateTime: boolean = false): string {
        if (!value) {
            return 'None';
        }

        if (isDateTime) {
            return formatDate(value, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        }

        return formatDate(value, 'yyyy-MM-dd', 'en-US');
    }

}
