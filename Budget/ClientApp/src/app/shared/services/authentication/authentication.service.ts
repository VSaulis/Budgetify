import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../contracts/authentication/LoginRequest';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoggedUser} from '../../models/authentication/LoggedUser';
import {ResultResponse} from '../../contracts/ResultResponse';
import {map} from 'rxjs/operators';
import {RegisterRequest} from '../../contracts/authentication/RegisterRequest';
import {BaseResponse} from '../../contracts/BaseResponse';
import {RefreshTokenRequest} from '../../contracts/authentication/RefreshTokenRequest';
import {environment} from '../../../../environments/environment';
import {PermissionService} from '../permission/permission.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private url = `${environment.apiUrl}/authentication`;
    private loggedUserBehaviorSubject = new BehaviorSubject<LoggedUser>(null);

    constructor(private http: HttpClient, private permissionService: PermissionService) {
    }

    login(request: LoginRequest): Observable<LoggedUser> {
        return this.http.post<ResultResponse<LoggedUser>>(`${this.url}/login`, request)
            .pipe(map((result: ResultResponse<LoggedUser>) => result.result))
            .pipe(map((loggedUser: LoggedUser) => {
                this.setUser(loggedUser);
                return loggedUser;
            }));
    }

    register(request: RegisterRequest): Observable<number> {
        return this.http.post<ResultResponse<number>>(`${this.url}/register`, request)
            .pipe(map((result: ResultResponse<number>) => result.result));
    }

    refreshToken(request: RefreshTokenRequest): Observable<LoggedUser> {
        return this.http.post<BaseResponse>(`${this.url}/refresh-token`, request)
            .pipe(map((result: ResultResponse<LoggedUser>) => result.result))
            .pipe(map((loggedUser: LoggedUser) => {
                this.setUser(loggedUser);
                return loggedUser;
            }));
    }

    getLoggedUser(): Observable<LoggedUser> {
        return this.http.get<ResultResponse<LoggedUser>>(`${this.url}/logged-user`)
            .pipe(map((result: ResultResponse<LoggedUser>) => result.result))
            .pipe(map((loggedUser: LoggedUser) => {
                this.setUser(loggedUser);
                return loggedUser;
            }));
    }

    logout(): void {
        localStorage.removeItem('loggedUser');
    }

    getUser(): LoggedUser {
        return JSON.parse(localStorage.getItem('loggedUser'));
    }

    getLoggedUserBehaviorSubject(): BehaviorSubject<LoggedUser> {
        return this.loggedUserBehaviorSubject;
    }

    private setUser(loggedUser: LoggedUser): void {
        this.loggedUserBehaviorSubject.next(loggedUser);
        this.permissionService.loadPermissions(loggedUser.permissions);
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
}
