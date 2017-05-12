import { Inject, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

import { BackendUri } from "./settings.service";
import { User } from '../models/user';

@Injectable()
export class UserService {

    constructor(
        private _http: Http,
        @Inject(BackendUri) private _backendUri: any) { }

    getCurrentUser(): Observable<User> {

        return Observable.create(
            (observer: Observer<User>) => {
                observer.next(User.defaultUser());
            }
        );
    }
}
