import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';
import { JwtResponse } from './jwt-response';

import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  AUTH_SERVER = 'http://localhost:3000';

  authSubject = new BehaviorSubject(false);

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/v1/register`, user).pipe(
      tap((res: JwtResponse) => {
        if (res.user) {
          localStorage.setItem(JSON.stringify('token'), res.user.accessToken);
          localStorage.setItem(JSON.stringify('expiresIn'), res.user.expiresIn);
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/v1/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res.user) {
          localStorage.setItem('token', res.user.accessToken);
          localStorage.setItem('expiresIn', res.user.expiresIn);
          this.authSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.authSubject.next(false);
    console.log('You are now logged out!');
    this.router.navigateByUrl('login');
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}

