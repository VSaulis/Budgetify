import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ResultResponse} from '../../contracts/ResultResponse';
import {map} from 'rxjs/operators';
import {Profile} from '../../models/profile/Profile';
import {AppService} from '../app/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private profileUrl = `${environment.apiUrl}/profile`;
    private profile = new BehaviorSubject<Profile>(null);

    constructor(private http: HttpClient) {
    }

    getProfile(): Observable<Profile> {
        return this.http.get<ResultResponse<Profile>>(this.profileUrl).pipe(map(result => result.result))
            .pipe(map((profile: Profile) => {
                this.setProfile(profile);
                return profile;
            }));
    }

    getCurrentProfile(): Observable<Profile> {
        return this.profile.asObservable();
    }

    setProfile(profile: Profile): void {
        this.profile.next(profile);
    }
}
