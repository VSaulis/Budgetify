import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResultResponse} from '../../contracts/ResultResponse';
import {map} from 'rxjs/operators';
import {Profile} from '../../models/profile/Profile';
import {AppService} from '../app/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private profileUrl = `${environment.apiUrl}/profile`;

    constructor(private http: HttpClient, private appService: AppService) {
    }

    getProfile(): Observable<Profile> {
        return this.http.get<ResultResponse<Profile>>(this.profileUrl).pipe(map(result => result.result))
            .pipe(map((profile: Profile) => {
                this.appService.setProfile(profile);
                return profile;
            }));
    }
}
