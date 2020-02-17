import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequest} from '../../shared/contracts/authentication/LoginRequest';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {FormHelper} from '../../shared/utils/FormHelper';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    isSubmitting = false;
    error: string;

    constructor(private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService,
                private router: Router) {
        this.createForm();
    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login(): void {
        if (this.isSubmitting) {
            return;
        }

        FormHelper.markFormAsTouched(this.form);

        if (this.form.valid) {
            this.isSubmitting = true;

            this.authenticationService.login(this.mapLoginRequest()).subscribe(() => {
                return this.router.navigateByUrl('/admin');
            }, (error) => {
                this.error = error.error.errors;
                this.isSubmitting = false;
            });
        }
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, [Validators.required]]
        });
    }

    private mapLoginRequest(): LoginRequest {
        return {
            email: this.form.get('email').value,
            password: this.form.get('password').value
        };
    }

}
