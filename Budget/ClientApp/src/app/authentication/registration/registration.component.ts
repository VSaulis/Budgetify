import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormHelper} from '../../shared/utils/FormHelper';
import {RegisterRequest} from '../../shared/contracts/authentication/RegisterRequest';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;
    isSubmitting = false;
    error: string;

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private router: Router) {
        this.createForm();
    }

    ngOnInit() {
    }

    register(): void {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            this.authenticationService.register(this.mapRegisterRequest()).subscribe(() => {
                return this.router.navigateByUrl('/');
            }, (error) => {
                this.error = error;
                this.isSubmitting = false;
            });
        }
    }

    private createForm(): void {
        this.form = this.fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
            repeatPassword: [null, Validators.required]
        });
    }

    private mapRegisterRequest(): RegisterRequest {
        return {
            email: this.form.get('email').value,
            password: this.form.get('password').value
        };
    }

}
