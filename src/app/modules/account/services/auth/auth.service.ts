import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  domain = 'http://localhost:3000';
  constructor(private http: Http) { }

  registerUser(user) {
    return this.http.post(this.domain + '/api/user', user).map(res => res.json());
  }
}
