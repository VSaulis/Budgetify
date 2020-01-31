import {FormGroup} from '@angular/forms';

export class FormHelper {

    static markFormAsTouched(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            form.controls[key].markAsTouched();
        });
    }
}
