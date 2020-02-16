import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AddGroupRequest} from '../../contracts/group/AddGroupRequest';
import {Paging} from '../../contracts/Paging';
import {ListResponse} from '../../contracts/ListResponse';
import {SortTypes} from '../../enums/SortTypes';
import {GroupsListItem} from '../../models/group/GroupsListItem';
import {ResultResponse} from '../../contracts/ResultResponse';
import {map} from 'rxjs/operators';
import {Group} from '../../models/group/Group';
import {EditGroupRequest} from '../../contracts/group/EditGroupRequest';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    private groupsUrl = `${environment.apiUrl}/groups`;
    private groupBehaviorSubject = new BehaviorSubject<GroupsListItem>(null);

    constructor(private http: HttpClient) {
    }

    getGroups(paging: Paging): Observable<ListResponse<GroupsListItem>> {
        const params: any = {};
        params.sortColumn = 'created';
        params.sortType = SortTypes.desc;
        params.limit = 20;
        params.offset = 0;
        return this.http.get<ListResponse<GroupsListItem>>(this.groupsUrl, {params});
    }

    addGroup(request: AddGroupRequest): Observable<void> {
        return this.http.post<void>(this.groupsUrl, request);
    }

    editGroup(request: EditGroupRequest): Observable<void> {
        return this.http.put<void>(this.groupsUrl, request);
    }

    getGroup(id: number): Observable<Group> {
        return this.http.get<ResultResponse<Group>>(`${this.groupsUrl}/${id}`).pipe(map(result => result.result));
    }

    deleteGroup(id: number): Observable<void> {
        return this.http.delete<void>(`${this.groupsUrl}/${id}`);
    }

    selectGroup(groupsListItem: GroupsListItem): void {
        this.groupBehaviorSubject.next(groupsListItem);
    }

    getSelectedGroup(): Observable<GroupsListItem> {
        return this.groupBehaviorSubject.asObservable();
    }
}
