import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { User } from "../models/user";
import { UserService } from "./user.service";

@Injectable()
export class UsersResolve implements Resolve<User> {

    constructor(private _userService: UserService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._userService.getCurrentUser();
    }
}
