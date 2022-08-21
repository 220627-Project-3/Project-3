import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;
  _getSessionPath: string = `${this.authUrl}/session`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  login(email: any, password: any): Observable<any> {
    const payload = { email: email, password: password };
    return this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(
    firstName: any,
    lastName: any,
    email: any,
    password: any
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }

  // Get information of current user
  getSession(): any {
    return this.http.get(this._getSessionPath, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  private _user = new BehaviorSubject<User>({
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
  });

  private _user$ = this._user.asObservable();

  getUser(): Observable<User> {
    return this._user$;
  }

  setUser(latestValue: User) {
    return this._user.next(latestValue);
  }
}
