import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse} from '../../contracts/ListResponse';
import {UsersListItem} from '../../models/user/UsersListItem';
import {UsersFilter} from '../../contracts/user/UsersFilter';
import {Sort} from '../../contracts/Sort';
import {Paging} from '../../contracts/Paging';
import {User} from '../../models/user/User';
import {ResultResponse} from '../../contracts/ResultResponse';
import {AddUserRequest} from '../../contracts/user/AddUserRequest';
import {EditUserRequest} from '../../contracts/user/EditUserRequest';
import {map} from 'rxjs/operators';
import {StringHelper} from '../../utils/StringHelper';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {
    }

    getUsers(filter: UsersFilter = null, sort: Sort = null, paging: Paging = null): Observable<ListResponse<UsersListItem>> {
        const params: any = {};

        if (filter) {
            if (filter.email) {
                params.email = filter.email;
            }
        }

        if (sort) {
            if (sort.column) {
                params.sortColumn = StringHelper.capitalize(sort.column);
            }

            if (sort.type) {
                params.sortType = sort.type;
            }
        }

        if (paging) {
            if (paging.limit) {
                params.limit = paging.limit;
            }

            if (paging.offset || paging.offset === 0) {
                params.offset = paging.offset;
            }
        }

        return this.http.get<ListResponse<UsersListItem>>(this.usersUrl, {params});
    }

    getUser(id: number): Observable<User> {
        return this.http.get<ResultResponse<User>>(`${this.usersUrl}/${id}`).pipe(map(result => result.result));
    }

    addUser(request: AddUserRequest): Observable<void> {
        return this.http.post<void>(this.usersUrl, request);
    }

    editUser(request: EditUserRequest): Observable<void> {
        return this.http.put<void>(this.usersUrl, request);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.usersUrl}/${id}`);
    }
}
