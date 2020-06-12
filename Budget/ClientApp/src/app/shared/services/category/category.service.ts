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
import {CategoriesFilter} from '../../contracts/category/CategoriesFilter';
import {Category} from '../../models/category/Category';
import {CategoriesListItem} from '../../models/category/CategoriesListItem';
import {AddCategoryRequest} from '../../contracts/category/AddCategoryRequest';
import {EditCategoryRequest} from '../../contracts/category/EditCategoryRequest';
import {SortTypes} from '../../enums/SortTypes';
import {ValueHelper} from '../../utils/ValueHelper';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categoriesUrl = `${environment.apiUrl}/categories`;

    constructor(private http: HttpClient) {
    }

    getCategories(filter: CategoriesFilter = null, sort: Sort = null, paging: Paging = null): Observable<ListResponse<CategoriesListItem>> {
        const params: any = {};

        if (filter) {
            if (ValueHelper.hasValue(filter.totalFrom)) {
                params.totalFrom = filter.totalFrom;
            }

            if (ValueHelper.hasValue(filter.totalTo)) {
                params.totalTo = filter.totalTo;
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

        return this.http.get<ListResponse<CategoriesListItem>>(this.categoriesUrl, {params});
    }

    getCategory(id: number): Observable<Category> {
        return this.http.get<ResultResponse<Category>>(`${this.categoriesUrl}/${id}`).pipe(map(result => result.result));
    }

    addCategory(request: AddCategoryRequest): Observable<void> {
        return this.http.post<void>(this.categoriesUrl, request);
    }

    editCategory(request: EditCategoryRequest): Observable<void> {
        return this.http.put<void>(this.categoriesUrl, request);
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.categoriesUrl}/${id}`);
    }
}
