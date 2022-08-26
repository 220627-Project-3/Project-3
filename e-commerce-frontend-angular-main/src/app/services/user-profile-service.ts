import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root',
})

export class UserProfileService {

    httpUrl: string = `${environment.baseUrl}/users/`

    public currentUser = {};

    constructor(private http: HttpClient) { }

    public getUser(userId: number): Observable<HttpResponse<User>> {
        return this.http.get(this.httpUrl + userId, { observe: "response" }) as Observable<HttpResponse<User>>;
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.httpUrl + user.id, user, {
          headers: environment.headers,
          withCredentials: environment.withCredentials,
        });
    }
}