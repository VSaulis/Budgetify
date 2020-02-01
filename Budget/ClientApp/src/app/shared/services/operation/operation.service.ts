import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Sort} from '../../contracts/Sort';
import {Paging} from '../../contracts/Paging';
import {Observable} from 'rxjs';
import {ListResponse} from '../../contracts/ListResponse';
import {StringHelper} from '../../utils/StringHelper';
import {ResultResponse} from '../../contracts/ResultResponse';
import {map} from 'rxjs/operators';
import {OperationsFilter} from '../../contracts/operation/OperationsFilter';
import {OperationsListItem} from '../../models/operation/OperationsListItem';
import {EditOperationRequest} from '../../contracts/operation/EditOperationRequest';
import {AddOperationRequest} from '../../contracts/operation/AddOperationRequest';
import {Operation} from '../../models/operation/Operation';
import {Profile} from '../../models/profile/Profile';
import {ProfileService} from '../profile/profile.service';

@Injectable({
    providedIn: 'root'
})
export class OperationService {

    private operationsUrl = `${environment.apiUrl}/operations`;

    constructor(private http: HttpClient,
                private profileService: ProfileService) {
    }

    getOperations(filter: OperationsFilter, sort: Sort, paging: Paging): Observable<ListResponse<OperationsListItem>> {
        const params: any = {};

        if (filter) {
            if (filter.dateFrom) {
                params.dateFrom = filter.dateFrom;
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

        return this.http.get<ListResponse<OperationsListItem>>(this.operationsUrl, {params});
    }

    getOperation(id: number): Observable<Operation> {
        return this.http.get<ResultResponse<Operation>>(`${this.operationsUrl}/${id}`).pipe(map(result => result.result));
    }

    addOperation(request: AddOperationRequest): Observable<number> {
        return this.http.post<ResultResponse<number>>(this.operationsUrl, request).pipe(map(result => result.result))
            .pipe(map((id: number) => {
                this.profileService.getProfile().subscribe();
                return id;
            }));
    }

    editOperation(request: EditOperationRequest): Observable<number> {
        return this.http.put<ResultResponse<number>>(this.operationsUrl, request).pipe(map(result => result.result))
            .pipe(map((id: number) => {
                this.profileService.getProfile().subscribe();
                return id;
            }));
    }

    deleteOperation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.operationsUrl}/${id}`)
            .pipe(map(() => {
                this.profileService.getProfile().subscribe();
            }));
    }
}
