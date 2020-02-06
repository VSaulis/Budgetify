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
import {ProfileService} from '../profile/profile.service';
import {SortTypes} from '../../enums/SortTypes';

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

            if (filter.dateTo) {
                params.dateTo = filter.dateTo;
            }

            if (filter.amountFrom) {
                params.amountFrom = filter.amountFrom;
            }

            if (filter.amountTo) {
                params.amountTo = filter.amountTo;
            }

            if (filter.categoriesIds) {
                params.categoriesIds = filter.categoriesIds;
            }

            if (filter.usersIds) {
                params.categoriesIds = filter.categoriesIds;
            }
        }

        if (sort) {
            if (sort.column) {
                params.sortColumn = sort.column;
            }

            if (sort.type) {
                params.sortType = sort.type;
            }
        } else {
            params.sortColumn = 'created';
            params.sortType = SortTypes.desc;
        }

        if (paging) {
            if (paging.limit) {
                params.limit = paging.limit;
            }

            if (paging.offset || paging.offset === 0) {
                params.offset = paging.offset;
            }
        } else {
            params.limit = 20;
            params.offset = 0;
        }

        return this.http.get<ListResponse<OperationsListItem>>(this.operationsUrl, {params});
    }

    getOperation(id: number): Observable<Operation> {
        return this.http.get<ResultResponse<Operation>>(`${this.operationsUrl}/${id}`).pipe(map(result => result.result));
    }

    addOperation(request: AddOperationRequest): Observable<void> {
        return this.http.post<void>(this.operationsUrl, request)
            .pipe(map(() => {
                this.profileService.getProfile().subscribe();
            }));
    }

    editOperation(request: EditOperationRequest): Observable<void> {
        return this.http.put<void>(this.operationsUrl, request)
            .pipe(map(() => {
                this.profileService.getProfile().subscribe();
            }));
    }

    deleteOperation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.operationsUrl}/${id}`)
            .pipe(map(() => {
                this.profileService.getProfile().subscribe();
            }));
    }
}
