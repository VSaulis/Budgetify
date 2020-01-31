import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {catchError} from 'rxjs/operators';
import {RefreshTokenRequest} from '../../contracts/authentication/RefreshTokenRequest';
import {LoggedUser} from '../../models/authentication/LoggedUser';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshingToken = false;
    private loggedUser: LoggedUser;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loggedUser = this.authenticationService.getUser();

        if (this.loggedUser && this.loggedUser.token) {
            request = this.addAuthHeader(request);
        }

        return next.handle(request).pipe(catchError(error => {
            if (!(error instanceof HttpErrorResponse)) {
                return throwError(error);
            }
            if (error.status === 401) {
                return this.handle401Error(request, next, error);
            }
            return throwError(error);
        }));
    }

    private addAuthHeader(request: HttpRequest<any>) {
        return request.clone({setHeaders: {Authorization: `Bearer ${this.loggedUser.token}`}});
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, error) {
        if (this.isRefreshingToken || !this.loggedUser || !this.loggedUser.token) {
            this.authenticationService.logout();
            this.router.navigateByUrl('/login');
            return throwError(error);
        }

        this.isRefreshingToken = true;

        const refreshTokenRequest: RefreshTokenRequest = {
            refreshToken: this.loggedUser.refreshToken
        };

        this.authenticationService.refreshToken(refreshTokenRequest).subscribe((loggedUser: LoggedUser) => {
            this.isRefreshingToken = false;
            this.loggedUser = loggedUser;
            return next.handle(this.addAuthHeader(request));
        });
    }
}
