import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { TokenService } from './token.service';
import { User } from '../models/user';

const API_URL = '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  signup(user: User) {

    return this.http
      .post(
        API_URL + '/signup',
        user,
        { observe: 'response' }
      )
      .pipe(tap(res => {
        const token = res.body['token'];
        this.tokenService.setToken(token);
      }));
  }

  signin(email: string, password: string) {

    return this.http
      .post(
        API_URL + '/signin',
        { email, password },
        { observe: 'response' }
      )
      .pipe(tap(res => {
        const token = res.body['token'];
        this.tokenService.setToken(token);
      }));
  }

  signout() {

    this.tokenService.removeToken();
  }
}
