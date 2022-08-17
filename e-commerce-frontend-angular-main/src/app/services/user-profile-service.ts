import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root',
})

export class UserProfileService {

    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        })
    };

    public currentUser = {};

    constructor(private http: HttpClient) { }

    public getUser(userId: number): Observable<HttpResponse<User>> {
        return this.http.get("", { observe: "response" }) as Observable<HttpResponse<User>>;
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>("", user, this.httpOptions);
    }
}
