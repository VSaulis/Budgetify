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
import {SortTypes} from '../../enums/SortTypes';
import {ValueHelper} from '../../utils/ValueHelper';

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
            if (ValueHelper.hasValue(filter.email)) {
                params.email = filter.email;
            }

            if (ValueHelper.hasValue(filter.deleted)) {
                params.deleted = filter.deleted;
            }
        }

        if (sort) {
            if (ValueHelper.hasValue(sort.column)) {
                params.sortColumn = sort.column;
            }

            if (ValueHelper.hasValue(sort.type)) {
                params.sortType = sort.type;
            }
        } else {
            params.sortColumn = 'created';
            params.sortType = SortTypes.desc;
        }

        if (paging) {
            if (ValueHelper.hasValue(paging.limit)) {
                params.limit = paging.limit;
            }

            if (ValueHelper.hasValue(paging.offset)) {
                params.offset = paging.offset;
            }
        } else {
            params.limit = 20;
            params.offset = 0;
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
